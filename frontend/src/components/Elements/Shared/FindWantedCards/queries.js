import gql from 'graphql-tag';

const WANTED_CARDS_LIST = `
    id
    name
    cards {
        id
        name
        imgKey
        oracle_id
    }
`;

export const wantedCards = gql`
  query wantedCards($username: String!) {
    wantedCards(username: $username) {
      decks {
          ${WANTED_CARDS_LIST}
      }
      wantsLists {
          ${WANTED_CARDS_LIST}
      }
    }
  }
`;
