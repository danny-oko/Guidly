import { eq } from 'drizzle-orm';
import { mongolianUniversityTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

type MongolianUniversityInput = Omit<typeof mongolianUniversityTable.$inferInsert, 'id'>;
type MongolianUniversityUpdateInput = Partial<MongolianUniversityInput>;

export const createMongolianUniversity = async (
  _: unknown,
  { input }: { input: MongolianUniversityInput },
  { db }: GraphQLContext,
) => {
  const [mongolianUniversity] = await db.insert(mongolianUniversityTable).values(input).returning();

  return mongolianUniversity;
};

export const updateMongolianUniversity = async (
  _: unknown,
  { id, input }: { id: number; input: MongolianUniversityUpdateInput },
  { db }: GraphQLContext,
) => {
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as MongolianUniversityUpdateInput;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [mongolianUniversity] = await db
    .update(mongolianUniversityTable)
    .set(updates)
    .where(eq(mongolianUniversityTable.id, id))
    .returning();

  return mongolianUniversity ?? null;
};

export const deleteMongolianUniversity = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [mongolianUniversity] = await db
    .delete(mongolianUniversityTable)
    .where(eq(mongolianUniversityTable.id, id))
    .returning();

  return mongolianUniversity ?? null;
};
