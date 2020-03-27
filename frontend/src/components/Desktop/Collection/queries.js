import gql from 'graphql-tag';

export const getCollectionDesktop = gql`
  query getCollectionDesktop {
    collection {
      id
      cards {
        id
        card {
          id
          name
          cmc
          totalAmount
          imgKey
          isTwoFaced
          subTypes
          primaryTypes
          minPrice
          sumPrice
          oracle_id
          color_identity
        }
      }
    }
  }
`;
