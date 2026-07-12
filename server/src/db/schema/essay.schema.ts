import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';

export const essayTable = sqliteTable('essays', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id')
    .notNull()
    .references(() => profileTable.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  content: text('content'),
});
