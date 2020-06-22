import gql from 'graphql-tag';

export const COLLECTION_CARD_FIELDS = `
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
      owned
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
      snapshot {
        value
        amount
        amountUnique
      }
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;

export const addToCollectionDesktop = gql`
  mutation addToCollectionDesktop($cards: [CardInputType]!) {
    addToCollection(cards: $cards) {
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;

export const deleteAllFromCollection = gql`
  mutation deleteAllFromCollection($oracleIds: [String!]!) {
    deleteAllFromCollection(oracleIds: $oracleIds)
  }
`;
