import gql from 'graphql-tag';

export const setCommanderDesktop = gql`
  mutation setCommanderDesktop($cardIds: [String!]!, $deckId: String!) {
    setCommander(cardIds: $cardIds, deckId: $deckId) {
      id
      cards {
        id
        isCommander
      }
    }
  }
`;
