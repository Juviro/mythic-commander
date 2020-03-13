import gql from 'graphql-tag';

export const getMinimalCollection = gql`
  query getMinimalCollection {
    collection {
      id
      cards {
        oracle_id
        name
        previewImg
      }
    }
  }
`;
