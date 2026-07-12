import type { drizzleProvider } from '../db';

export type Database = ReturnType<typeof drizzleProvider>;

export type GraphQLContext = {
  db: Database;
  userId: string | null;
};
