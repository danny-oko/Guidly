import { and, eq } from 'drizzle-orm';
import { examTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getExams = async (
  _: unknown,
  __: unknown,
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return [];
  }

  return db.select().from(examTable).where(eq(examTable.profileId, profile.id));
};

export const getExamById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return null;
  }

  const [exam] = await db
    .select()
    .from(examTable)
    .where(and(eq(examTable.id, id), eq(examTable.profileId, profile.id)))
    .limit(1);

  return exam ?? null;
};
