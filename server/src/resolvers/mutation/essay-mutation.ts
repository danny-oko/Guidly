import { and, eq } from 'drizzle-orm';
import { essayTable } from '../../db/schema';
import { assertOwnProfileId, requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type EssayInput = Omit<typeof essayTable.$inferInsert, 'id' | 'profileId'> & {
  profileId?: number | null;
};
type EssayUpdateInput = Partial<EssayInput>;

export const createEssay = async (
  _: unknown,
  { input }: { input: EssayInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const { profileId: _profileId, ...values } = input;

  const [essay] = await db
    .insert(essayTable)
    .values({ ...values, profileId: profile.id })
    .returning();

  return essay;
};

export const updateEssay = async (
  _: unknown,
  { id, input }: { id: number; input: EssayUpdateInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  assertOwnProfileId(profile, input.profileId);
  const { profileId: _profileId, ...inputWithoutProfileId } = input;
  const updates = Object.fromEntries(
    Object.entries(inputWithoutProfileId).filter(
      ([, value]) => value !== undefined,
    ),
  ) as Omit<EssayUpdateInput, 'profileId'>;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [essay] = await db
    .update(essayTable)
    .set(updates)
    .where(and(eq(essayTable.id, id), eq(essayTable.profileId, profile.id)))
    .returning();

  return essay ?? null;
};

export const deleteEssay = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  const [essay] = await db
    .delete(essayTable)
    .where(and(eq(essayTable.id, id), eq(essayTable.profileId, profile.id)))
    .returning();

  return essay ?? null;
};
