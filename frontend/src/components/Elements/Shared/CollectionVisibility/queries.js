import gql from 'graphql-tag';

export const collectionVisibility = gql`
  query collectionVisibility {
    collection {
      id
      visibility
    }
  }
`;

export const changeCollectionVisibility = gql`
  mutation changeCollectionVisibility($visibility: String!) {
    changeCollectionVisibility(visibility: $visibility) {
      id
      visibility
    }
  }
`;

export const getUser = gql`
  query getUser {
    user {
      id
      username
    }
  }
`;
