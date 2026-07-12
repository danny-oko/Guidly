import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const mongolianMajorTable = sqliteTable('mongolian_majors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  universities: text('universities', { mode: 'json' }).$type<string[]>(),
  majorRequirements: text('major_requirements', { mode: 'json' }).$type<string[]>(),
});
