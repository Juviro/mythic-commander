import gql from 'graphql-tag';

export const addCardsToWantsList = gql`
  mutation addCardsToWantsList(
    $cards: [CardInputType!]!
    $wantsListId: String!
    $wantsListName: String
  ) {
    addCardsToWantsList(
      cards: $cards
      wantsListId: $wantsListId
      wantsListName: $wantsListName
    ) {
      id
      card {
        id
        oracle_id
        name
        imgKey

        oracleCard {
          _id
          isCommanderLegal
          isTwoFaced

          containingWantsLists {
            id
            name
            amount
          }
        }
      }
    }
  }
`;

export const wantsLists = gql`
  query wantsLists {
    wantsLists {
      id
      name
      lastEdit
      numberOfCards
    }
  }
`;
