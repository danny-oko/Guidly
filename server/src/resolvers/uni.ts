import { eq } from 'drizzle-orm';
import type { GraphQLContext } from './context';

import { mongolianMajorTable } from '../db/schema/mongolian-major-table.schema';
import { mongolianUniversityTable } from '../db/schema/mongolian-uni-table.schema';

type MajorParent = typeof mongolianUniversityTable.$inferSelect;

export const uniMajor = async (
  profile: MajorParent,
  _: unknown,
    { db }: GraphQLContext,
    ) => {
    return db
    .select()
    .from(mongolianMajorTable)
    .where(eq(mongolianMajorTable.id, profile.id));
};

