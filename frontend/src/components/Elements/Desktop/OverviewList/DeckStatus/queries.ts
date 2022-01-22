import gql from 'graphql-tag';

export const changeDeckStatus = gql`
  mutation changeDeckStatus($deckId: String!, $status: DeckStatus!) {
    changeDeckStatus(deckId: $deckId, status: $status) {
      id
      status
    }
  }
`;
