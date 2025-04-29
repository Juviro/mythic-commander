import gql from 'graphql-tag';

export const getEdhrecCards = gql`
  query getEdhrecCards($names: [String!]!, $themeSuffix: String) {
    edhrecCards(names: $names, themeSuffix: $themeSuffix) {
      cardLists {
        key
        title
        cards {
          id
          imgKey
          name
          synergy
          priceUsd
          priceEur
          owned
          game_changer
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
