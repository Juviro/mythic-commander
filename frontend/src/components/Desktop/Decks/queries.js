import gql from 'graphql-tag';

export const getDecksDesktop = gql`
  query getDecksDesktop {
    decks {
      id
      name
      lastEdit
      canEdit
      imgSrc
      status
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
      status
      lastEdit
      imgSrc
      colors
      numberOfCards
    }
  }
`;
