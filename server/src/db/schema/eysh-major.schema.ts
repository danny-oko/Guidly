import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { mongolianMajorTable } from './mongolian-major-table.schema';
import { eyshTable } from './eysh-table.schema';

export const eyshMajor = sqliteTable(
  'eysh_major',
  {
    eyshId: integer('university_id')
      .notNull()
      .references(() => eyshTable.id, { onDelete: 'cascade' }),
      mongolianMajorId: integer('major_id')
      .notNull()
      .references(() => mongolianMajorTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [ table.eyshId, table.mongolianMajorId ] })],
);