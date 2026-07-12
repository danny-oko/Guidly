import { and, eq } from 'drizzle-orm';
import { examTable } from '../../db/schema';
import { assertOwnProfileId, requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type ExamInput = Omit<typeof examTable.$inferInsert, 'id' | 'profileId'> & {
  profileId?: number | null;
};
type ExamUpdateInput = Partial<ExamInput>;

export const createExam = async (
  _: unknown,
  { input }: { input: ExamInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const { profileId: _profileId, ...values } = input;

  const [exam] = await db
    .insert(examTable)
    .values({ ...values, profileId: profile.id })
    .returning();

  return exam;
};

export const updateExam = async (
  _: unknown,
  { id, input }: { id: number; input: ExamUpdateInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  assertOwnProfileId(profile, input.profileId);
  const { profileId: _profileId, ...inputWithoutProfileId } = input;
  const updates = Object.fromEntries(
    Object.entries(inputWithoutProfileId).filter(
      ([, value]) => value !== undefined,
    ),
  ) as Omit<ExamUpdateInput, 'profileId'>;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [exam] = await db
    .update(examTable)
    .set(updates)
    .where(and(eq(examTable.id, id), eq(examTable.profileId, profile.id)))
    .returning();

  return exam ?? null;
};

export const deleteExam = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  const [exam] = await db
    .delete(examTable)
    .where(and(eq(examTable.id, id), eq(examTable.profileId, profile.id)))
    .returning();

  return exam ?? null;
};
