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

export const addCardsToDeckDesktop = gql`
  mutation addCardsToDeckDesktop($cards: [CardInputType!]!, $deckId: String!) {
    addCardsToDeck(cards: $cards, deckId: $deckId) {
        ${DECK_FIELDS}
    }
  }
`;
