import gql from 'graphql-tag';
import { CARD_FIELDS } from './cards';

const COLLECTION_FIELDS = `
  id
  cards {
    createdAt
    ${CARD_FIELDS}
  }
`;

export const getCollection = gql`
  query getCollection {
    collection {
      ${COLLECTION_FIELDS}
    }
  }
`;
export const getCollectionName = gql`
  query getCollectionName {
    collection {
      id
      cards {
        name
      }
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

export const deleteFromCollection = gql`
  mutation deleteFromCollection($cardIds: [String]!) {
    deleteFromCollection(cardIds: $cardIds) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const changeCollection = gql`
  mutation changeCollection(
    $cardOracleId: String!
    $added: [ChangeCollectionInput!]
    $edited: [ChangeCollectionInput!]
  ) {
    changeCollection(
      cardOracleId: $cardOracleId
      added: $added
      edited: $edited
    ) {
      id
      allSets {
        id
        amount
        amountFoil
      }
    }
  }
`;
