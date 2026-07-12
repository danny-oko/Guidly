import { and, eq } from 'drizzle-orm';
import { mongolianUniMajor } from '../../db/schema';
import type { GraphQLContext } from '../context';

type MongolianUniMajorInput = {
  mongolianUniversityId: number;
  majorId: number;
};

const toMongolianUniversityMajorPayload = (
  row: typeof mongolianUniMajor.$inferSelect,
) => ({
  mongolianUniversityId: row.mongolianUniId,
  majorId: row.mongolianMajorId,
});

export const createMongolianUniversityMajor = async (
  _: unknown,
  { input }: { input: MongolianUniMajorInput },
  { db }: GraphQLContext,
) => {
  const [createdMongolianUniMajor] = await db
    .insert(mongolianUniMajor)
    .values({
      mongolianUniId: input.mongolianUniversityId,
      mongolianMajorId: input.majorId,
    })
    .returning();

  return toMongolianUniversityMajorPayload(createdMongolianUniMajor);
};

export const deleteMongolianUniversityMajor = async (
  _: unknown,
  {
    mongolianUniversityId,
    majorId,
  }: { mongolianUniversityId: number; majorId: number },
  { db }: GraphQLContext,
) => {
  const [deletedMongolianUniMajor] = await db
    .delete(mongolianUniMajor)
    .where(
      and(
        eq(mongolianUniMajor.mongolianUniId, mongolianUniversityId),
        eq(mongolianUniMajor.mongolianMajorId, majorId),
      ),
    )
    .returning();

  return deletedMongolianUniMajor
    ? toMongolianUniversityMajorPayload(deletedMongolianUniMajor)
    : null;
};
