import { and, eq } from 'drizzle-orm';
import { eyshMajor } from '../../db/schema';
import type { GraphQLContext } from '../context';


type EyshMajorInput = typeof eyshMajor.$inferInsert;

export const createEyshMajor = async (
  _: unknown,
  { input }: { input: EyshMajorInput },
  { db }: GraphQLContext,
) => {
  const [createdEyshMajor] = await db
    .insert(eyshMajor)
    .values(input)
    .returning();

  return createdEyshMajor;
};

export const deleteEyshMajor = async (
  _: unknown,
  { eyshId, mongolianMajorId }: { eyshId: number; mongolianMajorId: number },
  { db }: GraphQLContext,
) => {
  const [deletedEyshMajor] = await db
    .delete(eyshMajor)
    .where(
      and(
        eq(eyshMajor.eyshId, eyshId),
        eq(eyshMajor.mongolianMajorId, mongolianMajorId),
      ),
    )
    .returning();

  return deletedEyshMajor ?? null;
};
