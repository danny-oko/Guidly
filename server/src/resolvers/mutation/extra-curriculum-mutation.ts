import { and, eq } from 'drizzle-orm';
import { extraCurriculumTable } from '../../db/schema';
import { assertOwnProfileId, requireOwnedProfile } from '../auth';
import type { GraphQLContext } from '../context';

type ExtraCurriculumInput = Omit<
  typeof extraCurriculumTable.$inferInsert,
  'id' | 'profileId'
> & {
  profileId?: number | null;
};
type ExtraCurriculumUpdateInput = Partial<ExtraCurriculumInput>;

export const createExtraCurriculum = async (
  _: unknown,
  { input }: { input: ExtraCurriculumInput },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context, input.profileId);
  const { profileId: _profileId, ...values } = input;

  const [extraCurriculum] = await db
    .insert(extraCurriculumTable)
    .values({ ...values, profileId: profile.id })
    .returning();

  return extraCurriculum;
};

export const updateExtraCurriculum = async (
  _: unknown,
  { id, input }: { id: number; input: ExtraCurriculumUpdateInput },
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
  ) as Omit<ExtraCurriculumUpdateInput, 'profileId'>;
  if (Object.keys(updates).length === 0) {
    throw new Error('No update fields provided');
  }

  const [extraCurriculum] = await db
    .update(extraCurriculumTable)
    .set(updates)
    .where(
      and(
        eq(extraCurriculumTable.id, id),
        eq(extraCurriculumTable.profileId, profile.id),
      ),
    )
    .returning();

  return extraCurriculum ?? null;
};

export const deleteExtraCurriculum = async (
  _: unknown,
  { id }: { id: number },
  context: GraphQLContext,
) => {
  const { db } = context;
  const profile = await requireOwnedProfile(context);
  const [extraCurriculum] = await db
    .delete(extraCurriculumTable)
    .where(
      and(
        eq(extraCurriculumTable.id, id),
        eq(extraCurriculumTable.profileId, profile.id),
      ),
    )
    .returning();

  return extraCurriculum ?? null;
};
