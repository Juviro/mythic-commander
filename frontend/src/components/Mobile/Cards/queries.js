import gql from 'graphql-tag';

export const paginatedCards = gql`
  query paginatedCards($offset: Int, $limit: Int, $options: CardsOptionsInput) {
    paginatedCards(offset: $offset, limit: $limit, options: $options) {
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
