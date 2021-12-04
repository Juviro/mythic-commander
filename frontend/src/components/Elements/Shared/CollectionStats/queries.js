import gql from 'graphql-tag';

export const currentSnapshots = gql`
  query currentSnapshots {
    collection {
      id
      currentSnapshot {
        date
        value
        valueEur
        amount
        amountUniqueVersions
        amountUnique
        missingPriceEur
      }
      referenceSnapshot {
        date
        value
        valueEur
        amount
        amountUniqueVersions
        amountUnique
      }
    }
  }
`;
