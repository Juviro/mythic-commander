import gql from 'graphql-tag';

export const getOwnedCardNames = gql`
  query getOwnedCardNames {
    ownedCardNames
  }
`;
