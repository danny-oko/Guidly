import { and, eq } from 'drizzle-orm';
import { documentTable } from '../../db/schema';
import { getCurrentProfile } from '../auth';
import type { GraphQLContext } from '../context';

export const getDocuments = async (
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
    .from(documentTable)
    .where(eq(documentTable.profileId, profile.id));
};

export const getDocumentById = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await getCurrentProfile(context);
  if (!profile) {
    return null;
  }

  const [document] = await db
    .select()
    .from(documentTable)
    .where(
      and(eq(documentTable.id, id), eq(documentTable.profileId, profile.id)),
    )
    .limit(1);

  return document ?? null;
};
