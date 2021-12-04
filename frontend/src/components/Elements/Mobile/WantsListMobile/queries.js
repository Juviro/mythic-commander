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
  query wantsListElements($id: String!) {
    wantsList(id: $id) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;

export const editWantsListCard = gql`
  mutation editWantsListCard(
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

export const deleteFromWantsListMobile = gql`
  mutation deleteFromWantsListMobile($oracleIds: [String!]!, $wantsListId: String!) {
    deleteFromWantsList(oracleIds: $oracleIds, wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;
