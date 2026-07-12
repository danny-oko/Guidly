import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer, type ApolloServerPlugin } from '@apollo/server';
import { auth } from '@clerk/nextjs/server';
import { drizzleProvider } from '../../../db';
import type { GraphQLContext } from '../../../resolvers/context';
import { typeDefs } from '../../../schemas';
import { resolvers } from '../../../resolvers';

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.GRAPHQL_ALLOWED_ORIGIN ?? '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, x-internal-auth',
};

export const corsPlugin: ApolloServerPlugin<GraphQLContext> = {
  requestDidStart: async () => {
    return {
      willSendResponse: async ({ response }) => {
        for (const [header, value] of Object.entries(corsHeaders)) {
          response.http?.headers.set(header, value);
        }
      },
    };
  },
};

const server = new ApolloServer<GraphQLContext>({
  resolvers,
  typeDefs,
  plugins: [corsPlugin],
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const { userId } = await auth({ acceptsToken: 'session_token' });

    return {
      db: drizzleProvider(),
      userId,
    };
  },
});

export async function OPTIONS() {
  return Response.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export { handler as GET, handler as POST };
