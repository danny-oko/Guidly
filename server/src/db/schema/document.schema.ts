import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';

export const documentTable = sqliteTable('documents', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id').references(() => profileTable.id, {
    onDelete: 'cascade',
  }),
  title: text('title').notNull(),
  description: text('description'),
  file: text('file'),
});
