import gql from 'graphql-tag';

export const cachedCards = gql`
  query cachedCards {
    cachedCards {
      i
      n
      k
      o
    }
  }
`;

export const numberOfCachedCards = gql`
  query numberOfCachedCards {
    numberOfCachedCards
  }
`;
