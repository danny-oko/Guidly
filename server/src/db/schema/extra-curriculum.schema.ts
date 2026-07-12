import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';

export const extraCurriculumTable = sqliteTable('extra_curriculum', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id')
    .notNull()
    .references(() => profileTable.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  participation: text('participation'),
});
