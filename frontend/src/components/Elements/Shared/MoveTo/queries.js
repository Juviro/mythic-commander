import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  cards {
    id
    amount
    createdAt
    card {
      id
    }
  }
`;

export const moveCard = gql`
  mutation moveCard(
    $cardId: String!
    $from: MoveCardInputType!
    $to: MoveCardInputType!
  ) {
    moveCard(cardId: $cardId, from: $from, to: $to) {
      from {
        __typename
        ... on WantsList {
          ${CARD_FIELDS}
        }
        ... on Deck {
          ${CARD_FIELDS}
        }
      }
      to {
        __typename
        ... on WantsList {
          ${CARD_FIELDS}
        }
        ... on Deck {
          ${CARD_FIELDS}
        }
      }
    }
  }
`;
