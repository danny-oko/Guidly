import { eq } from 'drizzle-orm';
import { universityTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

type UniversityInput = Omit<typeof universityTable.$inferInsert, 'id'>;
type UniversityUpdateInput = Partial<UniversityInput>;

export const createUniversity = async (
  _: unknown,
  { input }: { input: UniversityInput },
  { db }: GraphQLContext,
) => {
  const [university] = await db.insert(universityTable).values(input).returning();

  return university;
};

export const updateUniversity = async (
  _: unknown,
  { id, input }: { id: number; input: UniversityUpdateInput },
  { db }: GraphQLContext,
) => {
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as UniversityUpdateInput;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [university] = await db
    .update(universityTable)
    .set(updates)
    .where(eq(universityTable.id, id))
    .returning();

  return university ?? null;
};

export const deleteUniversity = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [university] = await db
    .delete(universityTable)
    .where(eq(universityTable.id, id))
    .returning();

  return university ?? null;
};
