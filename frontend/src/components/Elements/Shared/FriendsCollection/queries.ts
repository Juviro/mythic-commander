import gql from 'graphql-tag';

export const friendsCollection = gql`
  query friendsCollection($oracle_id: String!) {
    cardByOracleId(oracle_id: $oracle_id) {
      id
      oracleCard {
        friendsCollection {
          userId
          username
          amountTotal
          sets {
            id
            set
            set_name
            amount
            amountFoil
          }
        }
      }
    }
  }
`;
