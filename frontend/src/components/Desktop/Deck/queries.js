import gql from 'graphql-tag';

const CARD_FIELDS = `
    id
    amount
    isCommander
    createdAt
    card {
      id
      name
      cmc
      imgKey
      oracle_id
      set_name
      mana_cost
      color_identity
      possiblePartner
      
      oracleCard {
        _id
        owned
        isTwoFaced
        
        primaryTypes
        isCommanderLegal
        minPriceUsd
        minPriceEur
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
  mutation editDeckDesktop($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
      id
      name
      lastEdit
      imgSrc
    }
  }
`;

export const addCardsToDeckDesktop = gql`
  mutation addCardsToDeckDesktop(
      $cards: [CardInputType!]!, 
      $deckId: String!, 
      $deckName: String
    ) {
    addCardsToDeck(cards: $cards, deckId: $deckId, deckName: $deckName) {
        ${DECK_FIELDS}
    }
  }
`;

export const deleteFromDeckDesktop = gql`
  mutation deleteFromDeckDesktop($cardId: String, $cardIds: [String], $deckId: String!) {
    deleteFromDeck(cardId: $cardId, cardIds: $cardIds, deckId: $deckId) {
      ${DECK_FIELDS}
    }
  }
`;
