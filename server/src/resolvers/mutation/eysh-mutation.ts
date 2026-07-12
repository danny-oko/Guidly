import { eq } from 'drizzle-orm';
import { eyshTable } from '../../db/schema';
import type { GraphQLContext } from '../context';

type EyshInput = Omit<typeof eyshTable.$inferInsert, 'id'>;
type EyshUpdateInput = Partial<EyshInput>;

export const createeysh = async (
  _: unknown,
  { input }: { input: EyshInput },
  { db }: GraphQLContext,
) => {
  const [eysh] = await db.insert(eyshTable).values(input).returning();

  return eysh;
};

export const updateeysh = async (
  _: unknown,
  { id, input }: { id: number; input: EyshUpdateInput },
  { db }: GraphQLContext,
) => {
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as EyshUpdateInput;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [eysh] = await db
    .update(eyshTable)
    .set(updates)
    .where(eq(eyshTable.id, id))
    .returning();

  return eysh ?? null;
};

export const deleteeysh = async (
  _: unknown,
  { id }: { id: number },
  { db }: GraphQLContext,
) => {
  const [eysh] = await db
    .delete(eyshTable)
    .where(eq(eyshTable.id, id))
    .returning();

  return eysh ?? null;
};
