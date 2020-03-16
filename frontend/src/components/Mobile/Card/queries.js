import gql from 'graphql-tag';

export const getCardByOracleId = gql`
  query cardsByOracleId($oracle_id: String!) {
    cardsByOracleId(oracle_id: $oracle_id) {
      id
      oracle_id
      name
      isCommanderLegal
      imgKey
      isTwoFaced
      rulings_uri

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
    }
  }
`;
