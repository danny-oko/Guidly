import { eq } from 'drizzle-orm';
import { universityTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

export const getUniversities = async (
  _: unknown,
  __: unknown,
  { db }: GraphQLContext,
) => {
  return db.select().from(universityTable);
};

export const getUniversityById = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [university] = await db
    .select()
    .from(universityTable)
    .where(eq(universityTable.id, id))
    .limit(1);

  return university ?? null;
};
