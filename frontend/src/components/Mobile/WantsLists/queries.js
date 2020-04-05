import gql from 'graphql-tag';

export const wantsLists = gql`
  query wantsLists {
    wantsLists {
      id
      name
      lastEdit
      numberOfCards
      deck {
        id
        name
        imgSrc
      }
    }
  }
`;

export const createWantsList = gql`
  mutation createWantsList {
    createWantsList {
      id
      name
      lastEdit
      numberOfCards
    }
  }
`;
