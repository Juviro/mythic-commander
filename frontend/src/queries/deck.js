import gql from 'graphql-tag';
import { CARD_FIELDS } from './cards';

const DECK_CARD_FIELDS = `
  ${CARD_FIELDS}
  primaryTypes
  zone
  owned
  colors
  color_identity
  oracle_id
  amount
  color_identity
`;

const DECK_FIELDS = `
    id
    name
    createdAt
    lastEdit
    imgSrc
    cards {
     ${DECK_CARD_FIELDS}
    }
`;

export const getDecks = gql`
  query decks {
    decks {
      id
      name
      lastEdit
      imgSrc
      numberOfCards
    }
  }
`;

export const getDeck = gql`
  query deck($id: String!) {
    deck(id: $id) {
      ${DECK_FIELDS}
    }
  }
`;

export const createDeck = gql`
  mutation createDeck {
    createDeck {
      id
      name
      lastEdit
      imgSrc
      numberOfCards
    }
  }
`;

export const editDeck = gql`
  mutation editDeck($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
        ${DECK_FIELDS}
    }
  }
`;

export const addCardsToDeck = gql`
  mutation addCardsToDeck($cards: [CardInputType!]!, $deckId: String!) {
    addCardsToDeck(cards: $cards, deckId: $deckId) {
      ${DECK_FIELDS}
    }
  }
`;

export const deleteFromDeck = gql`
  mutation deleteFromDeck($cardId: String!, $deckId: String!) {
    deleteFromDeck(cardId: $cardId, deckId: $deckId) {
      ${DECK_FIELDS}
    }
  }
`;

export const editDeckCard = gql`
  mutation editDeckCard(
    $cardId: String!, 
    $deckId: String! 
    $newProps: EditCardsPropsInput!
  ) {
    editDeckCard(
      cardId: $cardId, 
      deckId: $deckId, 
      newProps: $newProps
    ) {
      ${DECK_CARD_FIELDS}
    }
  }
`;

export const deleteDeck = gql`
  mutation deleteDeck($deckId: String!) {
    deleteDeck(deckId: $deckId)
  }
`;

export const duplicateDeck = gql`
  mutation duplicateDeck($deckId: String!) {
    duplicateDeck(deckId: $deckId)
  }
`;
