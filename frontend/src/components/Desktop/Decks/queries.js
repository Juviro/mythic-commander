import gql from 'graphql-tag';

export const getDecksDesktop = gql`
  query getDecksDesktop {
    decks {
      id
      name
      lastEdit
      imgSrc
      colors
      numberOfCards
    }
  }
`;

export const createDeckDesktop = gql`
  mutation createDeckDesktop {
    createDeck {
      id
      name
      lastEdit
      imgSrc
      colors
      numberOfCards
    }
  }
`;
