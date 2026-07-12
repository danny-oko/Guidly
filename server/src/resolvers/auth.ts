import { eq } from 'drizzle-orm';
import { GraphQLError } from 'graphql';
import { profileTable } from '../db/schema';
import type { Database, GraphQLContext } from './context';

export type ProfileRecord = typeof profileTable.$inferSelect;

export const requireUserId = ({ userId }: GraphQLContext) => {
  if (!userId) {
    throw new GraphQLError('Unauthenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }

  return userId;
};

export const getProfileByClerkUserId = async (
  db: Database,
  clerkUserId: string,
) => {
  const [profile] = await db
    .select()
    .from(profileTable)
    .where(eq(profileTable.clerkUserId, clerkUserId))
    .limit(1);

  return profile ?? null;
};

export const getCurrentProfile = async (context: GraphQLContext) => {
  const userId = requireUserId(context);

  return getProfileByClerkUserId(context.db, userId);
};

export const requireCurrentProfile = async (context: GraphQLContext) => {
  const profile = await getCurrentProfile(context);

  if (!profile) {
    throw new GraphQLError('Profile not found', {
      extensions: { code: 'PROFILE_NOT_FOUND' },
    });
  }

  return profile;
};

export const assertOwnProfileId = (
  profile: ProfileRecord,
  profileId?: number | null,
) => {
  if (profileId != null && profileId !== profile.id) {
    throw new GraphQLError('Profile does not belong to current user', {
      extensions: { code: 'FORBIDDEN' },
    });
  }
};

export const requireOwnedProfile = async (
  context: GraphQLContext,
  profileId?: number | null,
) => {
  const profile = await requireCurrentProfile(context);
  assertOwnProfileId(profile, profileId);

  return profile;
};
