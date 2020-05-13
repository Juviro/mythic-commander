import gql from 'graphql-tag';

export const editDeck = gql`
  mutation editDeck($deckId: String!, $newProperties: EditDeckFieldsInput!) {
    editDeck(deckId: $deckId, newProperties: $newProperties) {
      id
      name
      lastEdit
      imgSrc
    }
  }
`;
