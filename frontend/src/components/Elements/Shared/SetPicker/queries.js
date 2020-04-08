import gql from 'graphql-tag';

export const allCardSets = gql`
  query allCardSets($oracle_id: String!) {
    cardByOracleId(oracle_id: $oracle_id) {
      id
      oracleCard {
        _id
        allSets {
          id
          set
          imgKey
          set_name
        }
      }
    }
  }
`;
