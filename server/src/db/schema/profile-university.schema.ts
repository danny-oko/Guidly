import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';
import { universityTable } from './university.schema';

export const profileUniversityTable = sqliteTable(
  'profile_universities',
  {
    profileId: integer('profile_id')
      .notNull()
      .references(() => profileTable.id, { onDelete: 'cascade' }),
    universityId: integer('university_id')
      .notNull()
      .references(() => universityTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.profileId, table.universityId] })],
);
