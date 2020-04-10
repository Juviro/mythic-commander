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
    
    oracleCard {
      _id
      owned
      minPrice
      isTwoFaced
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
  query wantsList($id: String!) {
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

export const deleteFromWantsList = gql`
  mutation deleteFromWantsList($cardId: String!, $wantsListId: String!) {
    deleteFromWantsList(cardId: $cardId, wantsListId: $wantsListId) {
      ${WANTS_LIST_FIELDS}
    }
  }
`;
