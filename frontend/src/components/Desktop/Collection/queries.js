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
      minPriceUsd
      minPriceEur
      sumPriceUsd
      sumPriceEur
    }
  }
`;

export const getCollectionDesktop = gql`
  query paginatedCollection {
    paginatedCollection {
      hasMore
      nextOffset
      totalResults
      cards {
        ${COLLECTION_CARD_FIELDS}
      }
    }
  }
`;

export const getSnapshotDesktop = gql`
  query getSnapshotDesktop {
    collectionSnapshots {
      date
      value
      amount
      amountUnique
    }
  }
`;

export const addToCollectionDesktop = gql`
  mutation addToCollectionDesktop($cards: [CardInputType]!) {
    addToCollection(cards: $cards) {
      id
      owned
    }
  }
`;

export const deleteAllFromCollection = gql`
  mutation deleteAllFromCollection($oracleIds: [String!]!) {
    deleteAllFromCollection(oracleIds: $oracleIds)
  }
`;
