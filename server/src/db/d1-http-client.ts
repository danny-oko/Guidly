import type { D1Database, D1PreparedStatement } from '@cloudflare/workers-types';

type D1ApiResponse = {
  success: boolean;
  result?: Array<{
    results?: unknown[];
    meta?: Record<string, unknown>;
  }>;
  errors?: Array<{
    message: string;
  }>;
};

const emptyMeta = {
  duration: 0,
  size_after: 0,
  rows_read: 0,
  rows_written: 0,
  last_row_id: 0,
  changed_db: false,
  changes: 0,
};

const getMeta = (meta: Record<string, unknown> | undefined) => ({
  ...emptyMeta,
  ...(meta ?? {}),
});

const getD1HttpConfig = () => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_DATABASE_ID;
  const token =
    process.env.CLOUDFLARE_D1_TOKEN ?? process.env.CLOUDFLARE_API_TOKEN;

  if (!accountId || !databaseId || !token) {
    throw new Error(
      'D1 is not available in Next dev. Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_DATABASE_ID, and CLOUDFLARE_D1_TOKEN.',
    );
  }

  return {
    baseUrl: `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
    token,
  };
};

const runD1Query = async (sql: string, params: unknown[] = []) => {
  const { baseUrl, token } = getD1HttpConfig();
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
  });

  if (!response.ok) {
    throw new Error(
      `Cloudflare D1 request failed with ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as D1ApiResponse;

  if (!data.success) {
    throw new Error(
      data.errors?.[0]?.message ?? 'Cloudflare D1 request failed',
    );
  }

  return data.result?.[0] ?? { results: [], meta: {} };
};

const createD1Statement = (
  sql: string,
  params: unknown[] = [],
): D1PreparedStatement => {
  const bind = (...values: unknown[]) => createD1Statement(sql, values);

  async function first<T = unknown>(colName: string): Promise<T | null>;
  async function first<T = Record<string, unknown>>(): Promise<T | null>;
  async function first<T = unknown>(colName?: string) {
    const result = await runD1Query(sql, params);
    const row = result.results?.[0] as Record<string, unknown> | undefined;

    if (!row) {
      return null;
    }

    return (colName ? row[colName] : row) as T;
  }

  const all = async <T = Record<string, unknown>>() => {
    const result = await runD1Query(sql, params);

    return {
      results: (result.results ?? []) as T[],
      meta: getMeta(result.meta),
      success: true as const,
    };
  };

  const run = async <T = Record<string, unknown>>() => {
    const result = await runD1Query(sql, params);

    return {
      results: (result.results ?? []) as T[],
      meta: getMeta(result.meta),
      success: true as const,
    };
  };

  async function raw<T = unknown[]>(options: {
    columnNames: true;
  }): Promise<[string[], ...T[]]>;
  async function raw<T = unknown[]>(options?: {
    columnNames?: false;
  }): Promise<T[]>;
  async function raw<T = unknown[]>(options?: { columnNames?: boolean }) {
    const result = await runD1Query(sql, params);
    const rows = result.results ?? [];

    const keys = rows.length > 0 ? Object.keys(rows[0] as object) : [];
    const rawRows = rows.map((row) =>
      keys.map((key) => (row as Record<string, unknown>)[key]),
    ) as T[];

    return options?.columnNames ? [keys, ...rawRows] : rawRows;
  }

  return {
    bind,
    first,
    all,
    run,
    raw,
  };
};

export const createD1HttpClient = (): D1Database => {
  const client: D1Database = {
    prepare: (sql: string) => createD1Statement(sql),
    batch: async <T = unknown>(statements: D1PreparedStatement[]) => {
      return Promise.all(statements.map((statement) => statement.all<T>()));
    },
    exec: async (sql: string) => {
      const result = await runD1Query(sql);

      return {
        count: result.results?.length ?? 0,
        duration: 0,
      };
    },
    dump: async () => new ArrayBuffer(0),
    withSession: () => ({
      prepare: client.prepare,
      batch: client.batch,
      getBookmark: () => null,
    }),
  };

  return client;
};
