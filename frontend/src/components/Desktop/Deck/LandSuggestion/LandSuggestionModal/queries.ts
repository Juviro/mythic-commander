import gql from 'graphql-tag';

export const getLandsSuggestion = gql`
  query getLandsSuggestion($deckId: String!, $options: LandsSuggestionInput) {
    landsSuggestion(deckId: $deckId, options: $options) {
      groups {
        id
        name
        lands {
          id
          name
          selected
          amount
          owned
          gameChanger
        }
      }
    }
  }
`;
