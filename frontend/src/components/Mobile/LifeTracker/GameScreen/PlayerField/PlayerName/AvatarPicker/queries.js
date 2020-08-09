import gql from 'graphql-tag';

export const cardImages = gql`
  query cardImages($cardId: String!) {
    cardImages(cardId: $cardId)
  }
`;
