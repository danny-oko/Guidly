import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { profileTable } from './profile.schema';

export const awardTable = sqliteTable('awards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  profileId: integer('profile_id')
    .notNull()
    .references(() => profileTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  reward: text('reward'),
});
