import gql from 'graphql-tag';

const COLLECTION_FIELDS = `
  id
  cards {
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
  }
`;

export const getMobileCollection = gql`
  query getMobileCollection {
    collection {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollection = gql`
  mutation addToCollection($cards: [AddToCollectionInput]!) {
    addToCollection(cards: $cards) {
      ${COLLECTION_FIELDS}
    }
  }
`;
