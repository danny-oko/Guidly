import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';

export const examTable = sqliteTable('exams', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id')
    .notNull()
    .references(() => profileTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  date: text('date'),
  location: text('location'),
  time: text('time'),
  url: text('url'),
  score: text('score'),
});
