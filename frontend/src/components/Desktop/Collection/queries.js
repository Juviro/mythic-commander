import gql from 'graphql-tag';

const COLLECTION_CARD_FIELDS = `
  id
  createdAt
  card {
    id
    name
    cmc
    mana_cost
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
