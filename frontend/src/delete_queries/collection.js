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
export const getCollectionNames = gql`
  query getCollectionNames {
    collection {
      id
      cards {
        card {
          name
        }
      }
    }
  }
`;

export const addToCollection = gql`
  mutation addToCollection($cards: [AddToCollectionInput]!) {
    addToCollection(cards: $cards) {
      createdAt
      ${CARD_FIELDS}
    }
  }
`;

export const deleteFromCollection = gql`
  mutation deleteFromCollection($cardIds: [String]!) {
    deleteFromCollection(cardIds: $cardIds)
  }
`;
