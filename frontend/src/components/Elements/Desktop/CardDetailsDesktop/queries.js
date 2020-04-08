import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  oracle_id
  name
  imgKey

  oracleCard {
    _id
    owned
    isTwoFaced
    totalAmount
    isCommanderLegal
    allSets {
      id
      set
      imgKey
      amountOwned
      amountOwnedFoil
      set_name
      prices {
        usd
        usd_foil
      }

    }
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
      _id
      owned
      totalAmount
      sumPrice
      minPrice
      allSets {
        id
        amountOwned
        amountOwnedFoil
      }
    }
  }
`;
