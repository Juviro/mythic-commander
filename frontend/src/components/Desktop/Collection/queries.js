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
          mana_cost
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
