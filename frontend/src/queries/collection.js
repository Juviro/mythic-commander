import gql from 'graphql-tag';
import { CARD_FIELDS } from './cards';

export const COLLECTION_CARD_FIELDS = `
  createdAt
  amount
  priceInEuro
  priceLabel
  ${CARD_FIELDS}
`;

const COLLECTION_FIELDS = `
  id
  cards {
    ${COLLECTION_CARD_FIELDS}
  }
`;

export const getCollection = gql`
  query getCollection {
    collection {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollectionByName = gql`
  mutation addToCollectionByName($cards: [AddCardsByNameInput]!) {
    addToCollectionByName(cards: $cards) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollectionById = gql`
  mutation addToCollectionById($cards: [AddCardsByIdInput]!) {
    addToCollectionById(cards: $cards) {
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
