import gql from 'graphql-tag';

const WANTS_LIST_FIELDS = `
    id
    name
    lastEdit
    numberOfCards
    deck {
      id
      name
      imgSrc
    }
`;

export const wantsListsMobile = gql`
  query wantsListsMobile {
    wantsLists {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const createWantsList = gql`
  mutation createWantsList {
    createWantsList {
      ${WANTS_LIST_FIELDS}
    }
  }
`;
