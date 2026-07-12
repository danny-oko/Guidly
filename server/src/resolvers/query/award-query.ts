import { and, eq } from 'drizzle-orm';
import { awardTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getAwards = async (
  _: unknown,
  __: unknown,
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return [];
  }

  return db
    .select()
    .from(awardTable)
    .where(eq(awardTable.profileId, profile.id));
};

export const getAwardById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return null;
  }

  const [award] = await db
    .select()
    .from(awardTable)
    .where(and(eq(awardTable.id, id), eq(awardTable.profileId, profile.id)))
    .limit(1);

  return award ?? null;
};
