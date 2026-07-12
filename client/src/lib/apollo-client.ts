import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3005/api/graphql';

export const makeApolloClient = () =>
  new ApolloClient({
    link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
    cache: new InMemoryCache(),
  });
