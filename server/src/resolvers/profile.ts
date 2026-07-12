import { eq } from 'drizzle-orm';
import {
  awardTable,
  documentTable,
  essayTable,
  examTable,
  extraCurriculumTable,
  profileTable,
  profileUniversityTable,
  universityTable,
} from '../db/schema';
import type { GraphQLContext } from './context';

type ProfileParent = typeof profileTable.$inferSelect;

export const awards = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  return db
    .select()
    .from(awardTable)
    .where(eq(awardTable.profileId, profile.id));
};

export const essays = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  return db
    .select()
    .from(essayTable)
    .where(eq(essayTable.profileId, profile.id));
};

export const chosenUniversities = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  const rows = await db
    .select()
    .from(profileUniversityTable)
    .innerJoin(
      universityTable,
      eq(profileUniversityTable.universityId, universityTable.id),
    )
    .where(eq(profileUniversityTable.profileId, profile.id));

  return rows.map((row) => row.universities);
};

export const scores = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  return db
    .select()
    .from(examTable)
    .where(eq(examTable.profileId, profile.id));
};

export const documents = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  return db
    .select()
    .from(documentTable)
    .where(eq(documentTable.profileId, profile.id));
};

export const extraCurriculum = async (
  profile: ProfileParent,
  _: unknown,
  { db }: GraphQLContext,
) => {
  return db
    .select()
    .from(extraCurriculumTable)
    .where(eq(extraCurriculumTable.profileId, profile.id));
};
