import gql from 'graphql-tag';

export const changeCollection = gql`
  mutation changeCollection(
    $cardOracleId: String!
    $added: [ChangeCollectionInput!]
    $edited: [ChangeCollectionInput!]
  ) {
    changeCollection(
      cardOracleId: $cardOracleId
      added: $added
      edited: $edited
    ) {
      _id
      owned
      totalAmount
      sumPrice
      minPrice
      allSets {
        id
        amountOwned
        amountOwnedFoil
      }
    }
  }
`;

export const getCollectionNames = gql`
  query getCollectionNames {
    collection {
      id
      cards {
        id
        card {
          id
          name
        }
      }
    }
  }
`;
