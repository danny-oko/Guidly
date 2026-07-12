import { eq } from 'drizzle-orm';
import { mongolianUniversityTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

export const getMongolianUniversities = async (
  _: unknown,
  __: unknown,
  { db }: GraphQLContext,
) => {
  return db.select().from(mongolianUniversityTable);
};

export const getMongolianUniversityById = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [university] = await db
    .select()
    .from(mongolianUniversityTable)
    .where(eq(mongolianUniversityTable.id, id))
    .limit(1);

  return university ?? null;
};
