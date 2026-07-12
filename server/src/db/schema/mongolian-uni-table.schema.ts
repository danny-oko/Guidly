import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';


export const mongolianUniversityTable = sqliteTable('mongolian_universities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  logo: text('logo'),
  name: text('name').notNull(),
  description: text('description'),
  majors: text('majors', { mode: 'json' }).$type<string[]>(),
  control: text('control', { enum: ['PUBLIC', 'PRIVATE', 'OTHER'] }).notNull()
});


