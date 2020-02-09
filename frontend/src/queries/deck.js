import gql from 'graphql-tag';
import { CARD_FIELDS } from './cards';

const DECK_CARD_FIELDS = `
  ${CARD_FIELDS}
  primaryTypes
  subTypes
  flipTypes
  zone
  owned
  colors
  color_identity
  oracle_id
  amount
  priceInEuro
  priceLabel
  createdAt
  isFoil
  priceInEuro
  priceLabel
`;

export const DECK_FIELDS = `
  id
  name
  createdAt
  lastEdit
  imgSrc
`;

const DECK_FIELDS_WITH_CARDS = `
    ${DECK_FIELDS}
    cards {
     ${DECK_CARD_FIELDS}
    }
`;

export const getDecks = gql`
  query decks {
    decks {
      id
      name
      createdAt
      lastEdit
      imgSrc
    }
  }
`;

export const getDeck = gql`
  query deck($id: String!) {
    deck(id: $id) {
      ${DECK_FIELDS_WITH_CARDS}
    }
  }
`;

export const createDeck = gql`
  mutation createDeck {
    createDeck {
        ${DECK_FIELDS_WITH_CARDS}
    }
  }
`;

export const editDeck = gql`
  mutation editDeck($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
        ${DECK_FIELDS_WITH_CARDS}
    }
  }
`;

export const addCardsToDeck = gql`
  mutation addCardsToDeck($cards: [CardInputType]!, $deckId: String!) {
    addCardsToDeck(input: { cards: $cards, deckId: $deckId }) {
      ${DECK_FIELDS_WITH_CARDS}
    }
  }
`;

export const deleteFromDeck = gql`
  mutation deleteFromDeck($cardId: String!, $deckId: String!) {
    deleteFromDeck(cardId: $cardId, deckId: $deckId) {
      ${DECK_FIELDS_WITH_CARDS}
    }
  }
`;

export const editDeckCard = gql`
  mutation editDeckCard(
    $cardOracleId: String!, 
    $deckId: String! 
    $newProps: EditCardsPropsInput!
  ) {
    editDeckCard(
      cardOracleId: $cardOracleId, 
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
