'use client';

import { ApolloProvider } from '@apollo/client';
import { PropsWithChildren, useMemo } from 'react';
import { makeApolloClient } from '../lib/apollo-client';

export const ApolloClientProvider = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => makeApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
