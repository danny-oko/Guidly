import type { D1Database } from '@cloudflare/workers-types';
import { drizzle } from 'drizzle-orm/d1';
import { createD1HttpClient } from './d1-http-client';
import * as schema from './schema';

export const createDb = (database: D1Database) => {
  return drizzle(database, { schema });
};

export const createRemoteD1Db = () => {
  return createDb(createD1HttpClient());
};

export const drizzleProvider = (database?: D1Database) => {
  return database ? createDb(database) : createRemoteD1Db();
};
