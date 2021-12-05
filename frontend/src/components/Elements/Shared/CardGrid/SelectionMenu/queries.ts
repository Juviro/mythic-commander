import gql from 'graphql-tag';

export const addTagsToCards = gql`
  mutation addTagsToCards($deckId: String!, $tags: [String!]!, $cardIds: [String!]!) {
    addTagsToCards(deckId: $deckId, tags: $tags, cardIds: $cardIds) {
      id
      tags
    }
  }
`;
