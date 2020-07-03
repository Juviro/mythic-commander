import gql from 'graphql-tag';

export const currentSnapshots = gql`
  query currentSnapshots {
    collection {
      id
      currentSnapshot {
        date
        value
        amount
        amountUnique
      }
      referenceSnapshot {
        date
        value
        amount
        amountUnique
      }
    }
  }
`;
