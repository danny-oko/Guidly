import { integer, primaryKey, sqliteTable } from 'drizzle-orm/sqlite-core';
import { mongolianUniversityTable } from './mongolian-uni-table.schema';
import { mongolianMajorTable } from './mongolian-major-table.schema';

export const mongolianUniMajor = sqliteTable(
  'mongolian_uni_major',
  {
    mongolianUniId: integer('university_id')
      .notNull()
      .references(() => mongolianUniversityTable.id, { onDelete: 'cascade' }),
      mongolianMajorId: integer('major_id')
      .notNull()
      .references(() => mongolianMajorTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [ table.mongolianUniId, table.mongolianMajorId ] })],
);

// mongol surguuli bolon mergejliin hariltsaa table. mongolian_uni table bolon mongolian_majors table-iin id-g reference hiij bgaa. mongolian_uni table-iin primary key ni mongolianUniId, mongolianMajorId 2 column-iin hamt id bgaa.