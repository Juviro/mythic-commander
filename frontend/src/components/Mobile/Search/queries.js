import gql from 'graphql-tag';

export const cardSearch = gql`
  query cardSearch($offset: Int, $limit: Int, $options: CardsOptionsInput!) {
    cardSearch(offset: $offset, limit: $limit, options: $options) {
      hasMore
      nextOffset
      totalResults
      cards {
        id
        name
        imgKey
        mana_cost
        oracle_id
        isTwoFaced

        oracleCard {
          _id
          owned
          minPriceUsd
          minPriceEur
        }
      }
    }
  }
`;
