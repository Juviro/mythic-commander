import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  oracle_id
  name
  isCommanderLegal
  imgKey
  isTwoFaced
  rulings_uri
  containingWantsLists {
    id
    name
    amount
  }

  allSets {
    id
    set
    imgKey
    isTwoFaced
    amount
    set_name
    amountFoil
    prices {
      usd
      usd_foil
    }
  }
`;

export const getCardByOracleId = gql`
  query cardsByOracleId($oracle_id: String!) {
    cardsByOracleId(oracle_id: $oracle_id) {
      ${CARD_FIELDS}
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
