import gql from 'graphql-tag';

const WANTS_LIST_FIELDS = `
  id
  name
  createdAt
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
      
      oracleCard {
        _id
        owned
        minPrice
        isTwoFaced
      }
    }
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
