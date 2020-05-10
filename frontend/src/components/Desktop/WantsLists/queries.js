import gql from 'graphql-tag';

const WANTS_LIST_FIELDS = `
    id
    name
    lastEdit
    createdAt
    numberOfCards
    deck {
      id
      name
      imgSrc
    }
`;

export const wantsListsDesktop = gql`
  query wantsListsDesktop {
    wantsLists {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const createWantsListDesktop = gql`
  mutation createWantsListDesktop {
    createWantsList {
      ${WANTS_LIST_FIELDS}
    }
  }
`;
