import gql from 'graphql-tag';

export const getMinimalCollection = gql`
  query getMinimalCollection {
    collection {
      id
      cards {
        name
        amount
        minPrice
        oracle_id
        previewImg
      }
    }
  }
`;
