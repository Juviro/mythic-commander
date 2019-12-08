import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { SERVER_URL } from '../constants/network'

const httpLink = new HttpLink({ uri: SERVER_URL })

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  const authorization = { authorization: `Bearer ${token}` }
  return {
    token,
    headers: { ...headers, ...authorization },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    const isUnauthenticated = graphQLErrors.some(error => error.extensions.code === 'UNAUTHENTICATED')
    console.log('isUnauthenticated, graphQLErrors', isUnauthenticated, graphQLErrors)
    if (isUnauthenticated) {
      const next = decodeURIComponent(window.location.href)
      window.location.href = `/login?next=${next}`
    }
  }

  if (networkError) {
    console.warn('[NetworkError]:', networkError)
  }
})

const retryLink = new RetryLink({
  attempts: {
    max: 20,
    retryIf: error => {
      if (error.response) {
        // There was an actual response from the server. Unlikely that retrying will help.
        return false
      }

      // No response == Network error
      return true
    },
  },
})

const link = retryLink
  .concat(errorLink)
  .concat(authLink)
  .concat(httpLink)

const cache = new InMemoryCache({
  addTypename: true,
})

const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
  connectToDevTools: true,
  assumeImmutableResults: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
})

export default client
