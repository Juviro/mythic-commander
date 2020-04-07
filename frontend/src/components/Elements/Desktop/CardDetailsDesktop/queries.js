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

export const cardDetailsDesktop = gql`
  query cardDetailsDesktop($oracle_id: String!) {
    cardByOracleId(oracle_id: $oracle_id) {
      ${CARD_FIELDS}
    }
  }
`;

export const changeCollection = gql`
  mutation changeCollection(
    $cardOracleId: String!
    $added: [ChangeCollectionInput!]
    $edited: [ChangeCollectionInput!]
    $cardId: String
  ) {
    changeCollection(
      cardOracleId: $cardOracleId
      added: $added
      edited: $edited
      cardId: $cardId
    ) {
      id
      card {
        id
        totalAmount
        allSets {
          id
          amountOwned
          amountOwnedFoil
        }
      }
    }
  }
`;
