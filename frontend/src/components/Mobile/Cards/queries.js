import gql from 'graphql-tag';

export const cardSearch = gql`
  query cardSearch($offset: Int, $limit: Int, $options: CardsOptionsInput) {
    cardSearch(offset: $offset, limit: $limit, options: $options) {
      hasMore
      nextOffset
      totalResults
      cards {
        id
        name
        owned
        imgKey
        owned
        isTwoFaced
        minPrice
        oracle_id
      }
    }
  }
`;
