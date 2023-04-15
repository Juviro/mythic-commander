import gql from 'graphql-tag';
import { COLLECTION_CARD_FIELDS } from '../../../Desktop/Collection/queries';

const CARD_FIELDS = `
  id
  oracle_id
  name
  imgKey
  oracle_text
  scryfall_uri
  type_line
  isTwoFaced

  relatedCards {
    id
    name
    imgKey
    oracle_id
  }

  oracleCard {
    _id
    owned
    totalAmount
    isCommanderLegal
    allSets {
      id
      set
      imgKey
      amountOwned
      amountOwnedFoil
      set_name
      foil
      nonfoil
      isTwoFaced
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
      deck {
        imgSrc
      }
    }
  
    containingDecks {
      id
      name
      status
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

export const cardDetailsById = gql`
  query cardDetailsById($id: String!) {
    card(id: $id) {
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

export const updateCardImages = gql`
  mutation updateCardImages($cardId: String!) {
    updateCardImages(cardId: $cardId)
  }
`;
