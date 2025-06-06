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
          priceUsd
          priceEur
          game_changer
          oracleCard {
            owned
          }
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
