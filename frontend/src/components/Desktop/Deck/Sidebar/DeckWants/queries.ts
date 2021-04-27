import gql from 'graphql-tag';

const WANTS_LIST_CARD_FIELDS = `
  id
  amount
  createdAt
  card {
    id
    imgKey
    name
    cmc
    set_name
    mana_cost
    oracle_id
    
    oracleCard {
      _id
      owned
      minPriceUsd
      minPriceEur
      isTwoFaced
    }
  }
`;

const WANTS_LIST_FIELDS = `
  id
  name
  createdAt
  numberOfCards
  cards {
    ${WANTS_LIST_CARD_FIELDS}
  }
`;

export const wantsListsForDeck = gql`
  query wantsListsForDeck($deckId: String) {
    wantsLists(deckId: $deckId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const createLinkedWantsList = gql`
  mutation createLinkedWantsList($deckId: String) {
    createWantsList(deckId: $deckId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const deleteFromWantsList = gql`
  mutation deleteFromWantsList($oracleIds: [String!]!, $wantsListId: String!) {
    deleteFromWantsList(oracleIds: $oracleIds, wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const addCardsToWantsList = gql`
  mutation addCardsToWantsListDesktop($cards: [CardInputType!]!, $wantsListId: String!) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      ${WANTS_LIST_CARD_FIELDS}
    }
  }
`;
