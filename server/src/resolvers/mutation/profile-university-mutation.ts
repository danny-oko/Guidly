import { and, eq } from 'drizzle-orm';
import { profileUniversityTable } from '../../db/schema';
import { requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type ProfileUniversityInput = Omit<
  typeof profileUniversityTable.$inferInsert,
  'profileId'
> & {
  profileId?: number | null;
};

export const createProfileUniversity = async (
  _: unknown,
  { input }: { input: ProfileUniversityInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const [profileUniversity] = await db
    .insert(profileUniversityTable)
    .values({ profileId: profile.id, universityId: input.universityId })
    .returning();

  return profileUniversity;
};

export const deleteProfileUniversity = async (
  _: unknown,
  {
    profileId,
    universityId,
  }: { profileId?: number | null; universityId: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, profileId);
  const [profileUniversity] = await db
    .delete(profileUniversityTable)
    .where(
      and(
        eq(profileUniversityTable.profileId, profile.id),
        eq(profileUniversityTable.universityId, universityId),
      ),
    )
    .returning();

  return profileUniversity ?? null;
};
