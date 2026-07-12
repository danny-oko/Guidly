import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  verbose: true,
  schema: './src/db/schema/index.ts',
  out: './drizzle',
  breakpoints: false,
  schemaFilter: ['public'],
  tablesFilter: ['*', '!_cf_KV'],
  migrations: {
    prefix: 'timestamp',
    table: '__drizzle_migrations__',
  },
});
