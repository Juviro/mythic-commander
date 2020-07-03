import gql from 'graphql-tag';

export const getOwnedCardNames = gql`
  query ownedCardNames {
    ownedCardNames
  }
`;
