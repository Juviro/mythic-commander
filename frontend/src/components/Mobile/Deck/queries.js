import gql from 'graphql-tag';

const DECK_CARD_FIELDS = `
    id
    name
    set
    imgKey
    isTwoFaced
    oracle_id
    zone
    owned
    primaryTypes
    color_identity
    isCommanderLegal
    amount
    minPrice
    allSets {
      set
      id
      set_name
    }
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

export const getDeck = gql`
  query deck($id: String!) {
    deck(id: $id) {
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
