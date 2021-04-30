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
  mutation changeCollectionVisibility($visibility: Visibility!) {
    changeCollectionVisibility(visibility: $visibility) {
      id
      visibility
    }
  }
`;

export const changeWantsListVisibility = gql`
  mutation changeWantsListVisibility($wantsListId: String!, $visibility: Visibility!) {
    changeWantsListVisibility(wantsListId: $wantsListId, visibility: $visibility) {
      id
      visibility
    }
  }
`;

export const changeDeckVisibility = gql`
  mutation changeDeckVisibility($deckId: String!, $visibility: Visibility!) {
    changeDeckVisibility(deckId: $deckId, visibility: $visibility) {
      id
      visibility
    }
  }
`;
