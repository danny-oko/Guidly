import { eq } from 'drizzle-orm';
import type { GraphQLContext } from './context';

import { eyshMajor } from '../db/schema/eysh-major.schema';
import { mongolianMajorTable } from '../db/schema/mongolian-major-table.schema';
import { mongolianUniversityTable } from '../db/schema/mongolian-uni-table.schema';

type MajorParent = typeof mongolianMajorTable.$inferSelect;

export const majorUni = async (
  profile: MajorParent,
  _: unknown,
    { db }: GraphQLContext,
    ) => {
    return db
    .select()
    .from(mongolianUniversityTable)
    .where(eq(mongolianUniversityTable.id, profile.id));
};

export const majorEysh = async (
  profile: MajorParent,
  _: unknown,
    { db }: GraphQLContext,
    ) => {
    return db
    .select()
    .from(eyshMajor)
    .where(eq(eyshMajor.eyshId, profile.id));
};
