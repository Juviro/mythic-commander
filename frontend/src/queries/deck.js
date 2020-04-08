import gql from 'graphql-tag';

export const getDecks = gql`
  query decks {
    decks {
      id
      name
      lastEdit
      imgSrc
      numberOfCards
    }
  }
`;

export const createDeck = gql`
  mutation createDeck {
    createDeck {
      id
      name
      lastEdit
      imgSrc
      numberOfCards
    }
  }
`;

export const deleteDeck = gql`
  mutation deleteDeck($deckId: String!) {
    deleteDeck(deckId: $deckId)
  }
`;

export const duplicateDeck = gql`
  mutation duplicateDeck($deckId: String!) {
    duplicateDeck(deckId: $deckId)
  }
`;
