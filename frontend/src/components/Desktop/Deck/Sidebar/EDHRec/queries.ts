import gql from 'graphql-tag';

export const getEdhrecCards = gql`
  query getEdhrecCards($names: [String!]!, $themeSuffix: String) {
    edhrecCards(names: $names, themeSuffix: $themeSuffix) {
      cardLists {
        key
        title
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
      themes {
        title
        urlSuffix
        count
      }
    }
  }
`;
