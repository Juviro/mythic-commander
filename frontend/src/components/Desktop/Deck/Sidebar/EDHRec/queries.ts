import gql from 'graphql-tag';

export const getEdhrecCards = gql`
  query getEdhrecCards($names: [String!]!) {
    edhrecCards(names: $names) {
      title
      key
      cards {
        id
        oracle_id
        imgKey
        name
        synergy
        priceUsd
        priceEur
      }
    }
  }
`;
