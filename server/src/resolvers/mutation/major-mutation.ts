import { eq } from 'drizzle-orm';
import { mongolianMajorTable } from '../../db/schema';
import type { GraphQLContext } from '../context';


type MajorInput = Omit<typeof mongolianMajorTable.$inferInsert, 'id'>;
type MajorUpdateInput = Partial<MajorInput>;

export const createMajor = async (
  _: unknown,
  { input }: { input: MajorInput },
  { db }: GraphQLContext,
) => {
  const [major] = await db.insert(mongolianMajorTable).values(input).returning();

  return major;
};

export const updateMajor = async (
  _: unknown,
  { id, input }: { id: number; input: MajorUpdateInput },
  { db }: GraphQLContext,
) => {
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as MajorUpdateInput;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [major] = await db
    .update(mongolianMajorTable)
    .set(updates)
    .where(eq(mongolianMajorTable.id, id))
    .returning();

  return major ?? null;
};

export const deleteMajor = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [major] = await db
    .delete(mongolianMajorTable)
    .where(eq(mongolianMajorTable.id, id))
    .returning();

  return major ?? null;
};
