import { and, eq } from 'drizzle-orm';
import { extraCurriculumTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getExtraCurriculums = async (
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
    .from(extraCurriculumTable)
    .where(eq(extraCurriculumTable.profileId, profile.id));
};

export const getExtraCurriculumById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return null;
  }

  const [extraCurriculum] = await db
    .select()
    .from(extraCurriculumTable)
    .where(
      and(
        eq(extraCurriculumTable.id, id),
        eq(extraCurriculumTable.profileId, profile.id),
      ),
    )
    .limit(1);

  return extraCurriculum ?? null;
};
