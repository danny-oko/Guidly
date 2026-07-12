import { eq } from 'drizzle-orm';
import { eyshTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

export const geteyshs = async (
  _: unknown,
  __: unknown,
  { db }: GraphQLContext,
) => {
  return db.select().from(eyshTable);
};

export const geteyshById = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [eysh] = await db
    .select()
    .from(eyshTable)
    .where(eq(eyshTable.id, id))
    .limit(1);

  return eysh ?? null;
};
