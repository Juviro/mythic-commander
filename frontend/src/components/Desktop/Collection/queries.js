import gql from 'graphql-tag';

const COLLECTION_CARD_FIELDS = `
  id
  createdAt
  card {
    id
    name
    cmc
    mana_cost
    totalAmount
    imgKey
    isTwoFaced
    subTypes
    primaryTypes
    minPrice
    sumPrice
    oracle_id
    color_identity
  }
`;

export const getCollectionDesktop = gql`
  query getCollectionDesktop {
    collection {
      id
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;

export const addToCollectionDesktop = gql`
  mutation addToCollectionDesktop($cards: [AddToCollectionInput]!) {
    addToCollection(cards: $cards) {
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;
