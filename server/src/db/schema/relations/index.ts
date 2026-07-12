import { relations } from 'drizzle-orm';
import { awardTable } from '../award.schema';
import { documentTable } from '../document.schema';
import { essayTable } from '../essay.schema';
import { examTable } from '../exam.schema';
import { extraCurriculumTable } from '../extra-curriculum.schema';
import { profileTable } from '../profile.schema';
import { universityTable } from '../university.schema';
import { profileUniversityTable } from '../profile-university.schema';
import { eyshMajor } from '../eysh-major.schema';
import { mongolianMajorTable } from '../mongolian-major-table.schema';
import { eyshTable } from '../eysh-table.schema';
import { mongolianUniMajor } from '../mongolian-uni-major.schema';
import { mongolianUniversityTable } from '../mongolian-uni-table.schema';

export const universityRelations = relations(universityTable, ({ many }) => ({
  documents: many(documentTable),
  profiles: many(profileUniversityTable),
}));

export const profileRelations = relations(profileTable, ({ many }) => ({
  scores: many(examTable),
  chosenUniversities: many(profileUniversityTable),
  documents: many(documentTable),
  essays: many(essayTable),
  awards: many(awardTable),
  extraCurriculum: many(extraCurriculumTable),
}));

export const examRelations = relations(examTable, ({ one }) => ({
  profile: one(profileTable, {
    fields: [examTable.profileId],
    references: [profileTable.id],
  }),
}));

export const essayRelations = relations(essayTable, ({ one }) => ({
  profile: one(profileTable, {
    fields: [essayTable.profileId],
    references: [profileTable.id],
  }),
}));

export const awardRelations = relations(awardTable, ({ one }) => ({
  profile: one(profileTable, {
    fields: [awardTable.profileId],
    references: [profileTable.id],
  }),
}));

export const documentRelations = relations(documentTable, ({ one }) => ({
  profile: one(profileTable, {
    fields: [documentTable.profileId],
    references: [profileTable.id],
  }),
}));

export const extraCurriculumRelations = relations(
  extraCurriculumTable,
  ({ one }) => ({
    profile: one(profileTable, {
      fields: [extraCurriculumTable.profileId],
      references: [profileTable.id],
    }),
  }),
);

export const profileUniversityRelations = relations(
  profileUniversityTable,
  ({ one }) => ({
    profile: one(profileTable, {
      fields: [profileUniversityTable.profileId],
      references: [profileTable.id],
    }),
    university: one(universityTable, {
      fields: [profileUniversityTable.universityId],
      references: [universityTable.id],
    }),
  }),
);

/* eysh major table bolon mongolian uni major table-iin relations. eysh major table bolon mongolian uni major table-iin primary key ni 2 column-iin hamt id bgaa. */

export const eyshMajorRelations = relations(
  eyshMajor,
  ({ one }) => ({
    eysh: one(eyshTable, {
      fields: [eyshMajor.eyshId],
      references: [eyshTable.id],
    }),
    mongolianMajor: one(mongolianMajorTable, {
      fields: [eyshMajor.mongolianMajorId],
      references: [mongolianMajorTable.id],
    }),
  }),
);

export const uniMajorRelations = relations(
  mongolianUniMajor,
  ({ one }) => ({
    university: one(mongolianUniversityTable, {
      fields: [mongolianUniMajor.mongolianUniId],
      references: [mongolianUniversityTable.id],
    }),
    mongolianMajor: one(mongolianMajorTable, {
      fields: [mongolianUniMajor.mongolianMajorId],
      references: [mongolianMajorTable.id],
    }),
  }),
);
