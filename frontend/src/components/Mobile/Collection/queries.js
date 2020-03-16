import gql from 'graphql-tag';

export const getMobileCollection = gql`
  query getMobileCollection {
    collection {
      id
      cards {
        id
        name
        cmc
        totalAmount
        imgKey
        isTwoFaced
        subTypes
        primaryTypes
        minPrice
        oracle_id
        color_identity
      }
    }
  }
`;
