import { and, eq } from 'drizzle-orm';
import { documentTable } from '../../db/schema';
import { assertOwnProfileId, requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type DocumentInput = Omit<
  typeof documentTable.$inferInsert,
  'id' | 'profileId'
> & {
  profileId?: number | null;
};
type DocumentUpdateInput = Partial<DocumentInput>;

export const createDocument = async (
  _: unknown,
  { input }: { input: DocumentInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const { profileId: _profileId, ...values } = input;

  const [document] = await db
    .insert(documentTable)
    .values({ ...values, profileId: profile.id })
    .returning();

  return document;
};

export const updateDocument = async (
  _: unknown,
  { id, input }: { id: number; input: DocumentUpdateInput },
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
  ) as Omit<DocumentUpdateInput, 'profileId'>;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [document] = await db
    .update(documentTable)
    .set(updates)
    .where(
      and(eq(documentTable.id, id), eq(documentTable.profileId, profile.id)),
    )
    .returning();

  return document ?? null;
};

export const deleteDocument = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  const [document] = await db
    .delete(documentTable)
    .where(
      and(eq(documentTable.id, id), eq(documentTable.profileId, profile.id)),
    )
    .returning();

  return document ?? null;
};
