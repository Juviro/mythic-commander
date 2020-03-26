import gql from 'graphql-tag';

const CARD_FIELDS = `
    id
    amount
    zone
    createdAt
    card {
      id
      name
      set
      imgKey
      isTwoFaced
      oracle_id
      owned
      cmc
      set_name
      primaryTypes
      color_identity
      isCommanderLegal
      minPrice
    }
`;

const DECK_FIELDS = `
    id
    name
    createdAt
    lastEdit
    imgSrc
    numberOfCards
    cards {
    ${CARD_FIELDS}
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
    $newProps: EditDeckCardInput!
  ) {
    editDeckCard(
      cardId: $cardId, 
      deckId: $deckId, 
      newProps: $newProps
    ) {
      ${CARD_FIELDS}
    }
  }
`;

export const editDeck = gql`
  mutation editDeck($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
      id
      name
      lastEdit
      imgSrc
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
