import gql from 'graphql-tag';

export const collectionDevelopment = gql`
  query collectionDevelopment {
    collectionDevelopment {
      date
      value
      amount
      amountUnique
    }
  }
`;
