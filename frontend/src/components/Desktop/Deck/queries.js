import gql from 'graphql-tag';

const CARD_FIELDS = `
    id
    amount
    isCommander
    createdAt
    card {
      id
      name
      set
      imgKey
      oracle_id
      cmc
      set_name
      mana_cost
      color_identity
      
      oracleCard {
        _id
        owned
        isTwoFaced
        
        primaryTypes
        isCommanderLegal
        minPrice
      }
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

export const getDeckDesktop = gql`
  query getDeckDesktop($id: String!) {
    deck(id: $id) {
      ${DECK_FIELDS}
    }
  }
`;

export const editDeckCardDesktop = gql`
  mutation editDeckCardDesktop(
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

export const editDeckDesktop = gql`
  mutation editDeckDesktop(
    $deckId: String!
    $newProperties: EditDeckFieldsInput!
  ) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
      id
      name
      lastEdit
      imgSrc
    }
  }
`;

export const addCardsToDeckDesktop = gql`
  mutation addCardsToDeckDesktop($cards: [CardInputType!]!, $deckId: String!) {
    addCardsToDeck(cards: $cards, deckId: $deckId) {
        ${DECK_FIELDS}
    }
  }
`;

export const deleteFromDeckDesktop = gql`
  mutation deleteFromDeckDesktop($cardId: String!, $deckId: String!) {
    deleteFromDeck(cardId: $cardId, deckId: $deckId) {
      ${DECK_FIELDS}
    }
  }
`;
