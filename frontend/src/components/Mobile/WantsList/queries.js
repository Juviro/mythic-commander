import gql from 'graphql-tag';

const CARD_FIELDS = `
    id
    oracle_id
    name
    owned
    minPrice
    imgKey
    isTwoFaced
    amount
    cmc
`;

export const wantsList = gql`
  query wantsList($id: String!) {
    wantsList(id: $id) {
      id
      name
      lastEdit
      cards {
        ${CARD_FIELDS}
      }
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
