import gql from 'graphql-tag';

export const editDeckImage = gql`
  mutation editDeckImage($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
      id
      lastEdit
      imgSrc
    }
  }
`;
