import gql from 'graphql-tag';

export const getDecks = gql`
  query decks {
    decks {
      id
      name
      imgSrc
    }
  }
`;

export const linkWantsList = gql`
  mutation linkWantsList($wantsListId: String!, $deckId: String!) {
    linkWantsList(wantsListId: $wantsListId, deckId: $deckId) {
      id
      deck {
        id
        imgSrc
        name
      }
    }
  }
`;
