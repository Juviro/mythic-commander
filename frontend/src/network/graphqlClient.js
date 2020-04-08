import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { RetryLink } from 'apollo-link-retry';
import { message } from 'antd';
import { SERVER_URL } from '../constants/network';

const httpLink = new HttpLink({ uri: SERVER_URL });

const authLink = setContext((_, { headers }) => {
  const session = localStorage.getItem('session');

  const authorization = { authorization: `Bearer ${session}` };
  return {
    session,
    headers: { ...headers, ...authorization },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const isUnauthenticated = graphQLErrors.some(
      error => error.extensions.code === 'UNAUTHENTICATED'
    );
    console.info(
      'isUnauthenticated, graphQLErrors',
      isUnauthenticated,
      graphQLErrors
    );
    if (isUnauthenticated) {
      const next = decodeURIComponent(window.location.href);
      window.location.href = `/login?next=${next}`;
    } else {
      const errorMessage = graphQLErrors.length ? graphQLErrors[0].message : '';
      message.error(`An error occurred: ${errorMessage}`);
    }
  }

  if (networkError) {
    console.warn('[NetworkError]:', networkError);
  }
});

const retryLink = new RetryLink({
  attempts: {
    max: 5,
    retryIf: error => {
      if (error.response) {
        console.error('retry link - error:', error.response);
        // There was an actual response from the server.
        // Unlikely that retrying will help.
        return error.response.status === 500;
      }

      // No response == Network error
      return true;
    },
  },
});

const link = retryLink
  .concat(errorLink)
  .concat(authLink)
  .concat(httpLink);

const cache = new InMemoryCache({
  addTypename: true,
});

const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
  connectToDevTools: true,
  assumeImmutableResults: true,
});

export default client;
