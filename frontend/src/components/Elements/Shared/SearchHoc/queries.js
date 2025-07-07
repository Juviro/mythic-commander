import gql from 'graphql-tag';

export const cardSearch = gql`
  query cardSearch($offset: Int, $limit: Int, $options: CardsOptionsInput!) {
    cardSearch(offset: $offset, limit: $limit, options: $options) {
      totalResults
      hasMore
      cards {
        id
        name
        imgKey
        cmc
        mana_cost
        oracle_id
        priceUsd
        priceEur
        isTwoFaced
        game_changer

        oracleCard {
          _id
          owned
          primaryTypes
          subTypes
          scryfallTags {
            id
            name
            slug
            description
          }
        }
      }
    }
  }
`;
