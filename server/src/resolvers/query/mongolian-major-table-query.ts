import { eq } from 'drizzle-orm';
import { mongolianMajorTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

export const getMajors = async (
  _: unknown,
  __: unknown,
  { db }: GraphQLContext,
) => {
  return db.select().from(mongolianMajorTable);
};

export const getMajorById = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [major] = await db
    .select()
    .from(mongolianMajorTable)
    .where(eq(mongolianMajorTable.id, id))
    .limit(1);

  return major ?? null;
};
