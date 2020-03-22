import gql from 'graphql-tag';

export const allCardSets = gql`
  query allCardSets($oracle_id: String!) {
    cardsByOracleId(oracle_id: $oracle_id) {
      id
      allSets {
        id
        set
        imgKey
        set_name
      }
    }
  }
`;
