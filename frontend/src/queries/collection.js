import gql from 'graphql-tag';

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
