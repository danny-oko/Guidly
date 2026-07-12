# Guidly

University guidance app — Next.js client + GraphQL server (Next.js + Cloudflare D1).

## Prerequisites

- [Bun](https://bun.sh) 1.1+
- Cloudflare account + D1 database (for the server)
- Clerk app keys (for GraphQL auth)

## Setup

```bash
# from repo root
bun install

# client env
cp client/.env.example client/.env.local
# fill in TipTap, Resend, Google Sheets, LanguageTool, Clerk keys

# server env
cp server/.env.example server/.env.local
# fill in Cloudflare D1 + Clerk keys
```

## Run

Two terminals:

```bash
# GraphQL API — http://localhost:3005/api/graphql
cd server
bun run dev

# Web app — http://localhost:3004
cd client
bun run dev
```

Or from the root:

```bash
bun run dev:server
bun run dev:client
```

## Other scripts

| Command | Where | What |
| --- | --- | --- |
| `bun run codegen` | `client` or `server` | Regenerate GraphQL types |
| `bun run db:generate` | `server` | Create Drizzle migrations |
| `bun run db:migrate` | `server` | Apply migrations to remote D1 |
| `bun run build` | either | Production build |

## Ports

| App | Port | URL |
| --- | --- | --- |
| Client | 3004 | http://localhost:3004 |
| Server | 3005 | http://localhost:3005/api/graphql |
