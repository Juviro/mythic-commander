import gql from 'graphql-tag';

const getListFields = isDeck => `
  id
  cards {
    id
    amount
    ${isDeck ? 'isCommander' : ''}
    createdAt
    card {
      id
      name
      set
      imgKey
      oracle_id
      cmc
      set_name
      color_identity

      oracleCard {
        _id
        owned
        isTwoFaced

        primaryTypes
        isCommanderLegal
        minPrice
      }
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
          ${getListFields(false)}
        }
        ... on Deck {
          ${getListFields(true)}
        }
      }
      to {
        __typename
        ... on WantsList {
          ${getListFields(false)}
        }
        ... on Deck {
          ${getListFields(true)}
        }
      }
    }
  }
`;
