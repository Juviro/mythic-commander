import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  oracle_id
  name
  isCommanderLegal
  imgKey
  isTwoFaced
  
  containingWantsLists {
    id
    name
    amount
  }

  containingDecks {
    id
    name
    imgSrc
  }

  allSets {
    id
    set
    imgKey
    isTwoFaced
    amountOwned
    amountOwnedFoil
    set_name
    prices {
      usd
      usd_foil
    }
  }

`;

export const getCardByOracleId = gql`
  query cardByOracleId($oracle_id: String!) {
    cardByOracleId(oracle_id: $oracle_id) {
      ${CARD_FIELDS}
    }
  }
`;

export const addCardsToWantsList = gql`
  mutation addCardsToWantsList(
    $cards: [CardInputType!]!
    $wantsListId: String!
  ) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      id
      card {
        id
        oracle_id
        name
        isCommanderLegal
        imgKey
        isTwoFaced

        containingWantsLists {
          id
          name
          amount
        }
      }
    }
  }
`;
