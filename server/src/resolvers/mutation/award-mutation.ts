import { and, eq } from 'drizzle-orm';
import { awardTable } from '../../db/schema';
import { assertOwnProfileId, requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type AwardInput = Omit<typeof awardTable.$inferInsert, 'id' | 'profileId'> & {
  profileId?: number | null;
};
type AwardUpdateInput = Partial<AwardInput>;

export const createAward = async (
  _: unknown,
  { input }: { input: AwardInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const { profileId: _profileId, ...values } = input;

  const [award] = await db
    .insert(awardTable)
    .values({ ...values, profileId: profile.id })
    .returning();

  return award;
};

export const updateAward = async (
  _: unknown,
  { id, input }: { id: number; input: AwardUpdateInput },
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
  ) as Omit<AwardUpdateInput, 'profileId'>;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [award] = await db
    .update(awardTable)
    .set(updates)
    .where(and(eq(awardTable.id, id), eq(awardTable.profileId, profile.id)))
    .returning();

  return award ?? null;
};

export const deleteAward = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  const [award] = await db
    .delete(awardTable)
    .where(and(eq(awardTable.id, id), eq(awardTable.profileId, profile.id)))
    .returning();

  return award ?? null;
};
