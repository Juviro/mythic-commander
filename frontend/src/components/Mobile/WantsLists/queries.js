import gql from 'graphql-tag';

export const wantsLists = gql`
  query wantsLists {
    wantsLists {
      id
      name
      lastEdit
    }
  }
`;

export const createWantsList = gql`
  mutation createWantsList {
    createWantsList {
      id
      name
      lastEdit
    }
  }
`;
