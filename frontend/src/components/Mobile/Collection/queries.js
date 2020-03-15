import gql from 'graphql-tag';

export const getMinimalCollection = gql`
  query getMinimalCollection {
    collection {
      id
      cards {
        id
        name
        amount
        imgKey
        isTwoFaced
        minPrice
        oracle_id
        color_identity
      }
    }
  }
`;
