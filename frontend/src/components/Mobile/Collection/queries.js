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
