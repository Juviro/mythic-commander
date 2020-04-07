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
      oracle_id
      name
      owned
      minPrice
      imgKey
      isTwoFaced
      cmc
      set_name
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
