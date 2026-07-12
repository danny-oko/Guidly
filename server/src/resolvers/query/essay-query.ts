import { and, eq } from 'drizzle-orm';
import { essayTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getEssays = async (
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
    .from(essayTable)
    .where(eq(essayTable.profileId, profile.id));
};

export const getEssayById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return null;
  }

  const [essay] = await db
    .select()
    .from(essayTable)
    .where(and(eq(essayTable.id, id), eq(essayTable.profileId, profile.id)))
    .limit(1);

  return essay ?? null;
};
