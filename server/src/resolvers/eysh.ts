import { eq } from 'drizzle-orm';
import type { GraphQLContext } from './context';
import { eyshTable } from '../db/schema/eysh-table.schema';
import { eyshMajor } from '../db/schema/eysh-major.schema';

type EyshParent = typeof eyshTable.$inferSelect;

export const eyshMajors = async (
  profile: EyshParent,
  _: unknown,
    { db }: GraphQLContext,
    ) => {
    return db
    .select()
    .from(eyshMajor)
    .where(eq(eyshMajor.eyshId, profile.id));
};

