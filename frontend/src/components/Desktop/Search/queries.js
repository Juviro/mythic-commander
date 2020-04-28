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
        price

        oracleCard {
          _id
          isTwoFaced
          owned
          primaryTypes
          subTypes
        }
      }
    }
  }
`;
