import gql from 'graphql-tag'

export const getCollection = gql`
  query getCollection {
    collection {
      id
      isFoil
      set
    }
  }
`
