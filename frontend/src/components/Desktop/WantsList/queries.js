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
    color_identity
    isTwoFaced
    game_changer
    
    oracleCard {
      _id
      owned
      subTypes
      primaryTypes
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
  visibility
  canEdit
  deck {
    id
    imgSrc
    name
  }
  cards {
    ${CARD_FIELDS}
  }
`;

export const wantsListDesktop = gql`
  query wantsListDesktop($id: String!) {
    wantsList(id: $id) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const addCardsToWantsListDesktop = gql`
  mutation addCardsToWantsListDesktop($cards: [CardInputType!]!, $wantsListId: String!) {
    addCardsToWantsList(cards: $cards, wantsListId: $wantsListId) {
      ${CARD_FIELDS}
    }
  }
`;

export const deleteFromWantsListDesktop = gql`
  mutation deleteFromWantsListDesktop($oracleIds: [String!]!, $wantsListId: String!) {
    deleteFromWantsList(oracleIds: $oracleIds, wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const editWantsListDesktop = gql`
  mutation editWantsListDesktop(
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

export const editWantsListCardDesktop = gql`
  mutation editWantsListCardDesktop(
    $cardId: String!
    $wantsListId: String!
    $newProps: EditWantsListCardInput!
  ) {
    editWantsListCard(
      wantsListId: $wantsListId
      newProps: $newProps
      cardId: $cardId
    ) {
      ${CARD_FIELDS}
    }
  }
`;

export const deleteWantsListDesktop = gql`
  mutation deleteWantsListDesktop($wantsListId: String!) {
    deleteWantsList(wantsListId: $wantsListId)
  }
`;

export const duplicateWantsListDesktop = gql`
  mutation duplicateWantsListDesktop($wantsListId: String!) {
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
