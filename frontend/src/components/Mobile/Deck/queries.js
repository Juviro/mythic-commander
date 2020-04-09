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

export const wantsListsNamesForDeckMobile = gql`
  query wantsListsNamesForDeckMobile($deckId: String) {
    wantsLists(deckId: $deckId) {
      id
      name
    }
  }
`;
