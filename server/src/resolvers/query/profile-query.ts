import { eq } from 'drizzle-orm';
import { profileTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getProfiles = async (
  _: unknown,
  __: unknown,
  context: GraphQLContext,
) => {
  const profile = await getCurrentProfile(context);

  return profile ? [profile] : [];
};

export const getProfileById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const currentProfile = await getCurrentProfile(context);
  if (!currentProfile || currentProfile.id !== id) {
    return null;
  }

  const [profile] = await db
    .select()
    .from(profileTable)
    .where(eq(profileTable.id, id))
    .limit(1);

  return profile ?? null;
};

export const getMyProfile = async (
  _: unknown,
  __: unknown,
  context: GraphQLContext,
) => {
  return getCurrentProfile(context);
};
