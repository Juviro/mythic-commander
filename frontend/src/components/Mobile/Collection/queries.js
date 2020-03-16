import gql from 'graphql-tag';

const COLLECTION_CARD_FIELDS = `
    id
    name
    cmc
    totalAmount
    imgKey
    isTwoFaced
    createdAt
    subTypes
    primaryTypes
    minPrice
    sumPrice
    oracle_id
    color_identity
`;

const COLLECTION_FIELDS = `
  id
  cards {
    ${COLLECTION_CARD_FIELDS}
  }
`;

export const getMobileCollection = gql`
  query getMobileCollection {
    collection {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollectionMobile = gql`
  mutation addToCollectionMobile($cards: [AddToCollectionInput]!) {
    addToCollection(cards: $cards) {
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;
