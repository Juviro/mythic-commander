import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  amount
  createdAt
  card {
    id
    oracle_id
    name
    imgKey
    cmc
    mana_cost
    set_name
    isTwoFaced
    game_changer
    
    oracleCard {
      _id
      owned
      minPriceUsd
      minPriceEur
    }
  }
`;

const WANTS_LIST_FIELDS = `
  id
  name
  lastEdit
  numberOfCards
  canEdit
  visibility
  deck {
    id
    imgSrc
    name
  }
  cards {
    ${CARD_FIELDS}
  }
`;

export const wantsList = gql`
  query wantsList($id: String!) {
    wantsList(id: $id) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const addCardsToWantsList = gql`
  mutation addCardsToWantsList($cards: [CardInputType!]!, $wantsListId: String!) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      ${CARD_FIELDS}
    }
  }
`;

export const editWantsList = gql`
  mutation editWantsList(
    $wantsListId: String!
    $newProperties: EditWantsListFieldsInput!
  ) {
    editWantsList(wantsListId: $wantsListId, newProperties: $newProperties) {
      id
      name
      lastEdit
    }
  }
`;

export const deleteWantsList = gql`
  mutation deleteWantsList($wantsListId: String!) {
    deleteWantsList(wantsListId: $wantsListId)
  }
`;

export const duplicateWantsList = gql`
  mutation duplicateWantsList($wantsListId: String!) {
    duplicateWantsList(wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const unlinkWantsList = gql`
  mutation unlinkWantsList($wantsListId: String!) {
    unlinkWantsList(wantsListId: $wantsListId) {
      id
      deck {
        id
        imgSrc
        name
      }
    }
  }
`;
