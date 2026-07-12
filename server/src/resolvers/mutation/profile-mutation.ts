import { and, eq } from 'drizzle-orm';
import { profileTable } from '../../db/schema';
import { GraphQLError } from 'graphql';
import { getProfileByClerkUserId, requireUserId } from '../auth';
import type { GraphQLContext } from '../context';

type ProfileInput = Omit<
  typeof profileTable.$inferInsert,
  'id' | 'clerkUserId'
>;
type ProfileUpdateInput = Partial<ProfileInput>;

const profileAlreadyExistsError = () =>
  new GraphQLError('Profile already exists for current user', {
    extensions: { code: 'BAD_USER_INPUT' },
  });

const isClerkUserIdUniqueError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false;
  }

  return /profiles_clerk_user_id_unique|profiles\.clerk_user_id|UNIQUE constraint failed/i.test(
    error.message,
  );
};

export const createProfile = async (
  _: unknown,
  { input }: { input: ProfileInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const userId = requireUserId(context);
  const existingProfile = await getProfileByClerkUserId(db, userId);

  if (existingProfile) {
    throw profileAlreadyExistsError();
  }

  try {
    const [profile] = await db
      .insert(profileTable)
      .values({ ...input, clerkUserId: userId })
      .returning();

    return profile;
  } catch (error) {
    if (isClerkUserIdUniqueError(error)) {
      throw profileAlreadyExistsError();
    }

    throw error;
  }
};

export const updateProfile = async (
  _: unknown,
  { id, input }: { id: number; input: ProfileUpdateInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const userId = requireUserId(context);
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as ProfileUpdateInput;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [profile] = await db
    .update(profileTable)
    .set(updates)
    .where(and(eq(profileTable.id, id), eq(profileTable.clerkUserId, userId)))
    .returning();

  return profile ?? null;
};

export const deleteProfile = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const userId = requireUserId(context);
  const [profile] = await db
    .delete(profileTable)
    .where(and(eq(profileTable.id, id), eq(profileTable.clerkUserId, userId)))
    .returning();

  return profile ?? null;
};
