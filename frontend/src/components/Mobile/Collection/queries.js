import gql from 'graphql-tag';

const COLLECTION_CARD_FIELDS = `
    id
    createdAt
    card {
      id
      name
      cmc
      imgKey
      oracle_id
      mana_cost
      color_identity
      
      oracleCard {
        _id
        totalAmount
        isTwoFaced
        subTypes
        primaryTypes
        minPrice
        sumPrice
      }
    }
`;

export const paginatedCollection = gql`
  query paginatedCollection($limit: Int!, $offset: Int!, $orderBy: String!, $search: String, $username: String) {
    paginatedCollection(limit: $limit, offset: $offset, orderBy: $orderBy, search: $search, username: $username) {
      hasMore
      nextOffset
      totalResults
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;

export const addToCollectionMobile = gql`
  mutation addToCollectionMobile($cards: [CardInputType]!) {
    addToCollection(cards: $cards) {
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;
