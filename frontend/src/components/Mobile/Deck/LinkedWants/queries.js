import gql from 'graphql-tag';

const WANTS_LIST_FIELDS = `
  id
  name
  lastEdit
  numberOfCards
  cards {
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
      isTwoFaced
      
      oracleCard {
        _id
        owned
        minPriceUsd
        minPriceEur
      }
    }
  }
`;

export const wantsListsForDeckMobile = gql`
  query wantsListsForDeckMobile($deckId: String) {
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
