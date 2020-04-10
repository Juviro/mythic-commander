import gql from 'graphql-tag';

export const collectionSnapshots = gql`
  query collectionSnapshots {
    collectionSnapshots {
      date
      value
      amount
      amountUnique
    }
  }
`;
