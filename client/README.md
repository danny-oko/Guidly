# Guidly client

Next.js frontend on port **3004**.

```bash
cd client
bun install   # or from repo root: bun install
cp .env.example .env.local   # then fill secrets
bun run dev
```

Open http://localhost:3004

Point GraphQL at the local server with `NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3005/api/graphql` (already the default).
