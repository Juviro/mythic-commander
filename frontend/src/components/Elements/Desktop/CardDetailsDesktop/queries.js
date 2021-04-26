import gql from 'graphql-tag';
import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/queries';

const CARD_FIELDS = `
  id
  oracle_id
  name
  imgKey
  oracle_text
  scryfall_uri

  relatedCards {
    id
    name
    imgKey
    oracle_id
  }

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
        eur
        eur_foil
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
      ${COLLECTION_CARD_FIELDS}
    }
  }
`;
