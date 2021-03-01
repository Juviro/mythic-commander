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

export const changeWantsListVisibility = gql`
  mutation changeWantsListVisibility($wantsListId: String!, $visibility: String!) {
    changeWantsListVisibility(wantsListId: $wantsListId, visibility: $visibility) {
      id
      visibility
    }
  }
`;
