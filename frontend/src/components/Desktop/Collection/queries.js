import gql from 'graphql-tag';

export const getCollectionDesktop = gql`
  query getCollectionDesktop {
    collection {
      id
      cards {
        id
        name
        rarity
        oracle_id
        createdAt
        image_uris {
          small
          normal
        }
        card_faces {
          name
          image_uris {
            small
            normal
          }
          colors
        }
        prices {
          eur
          usd
          usd_foil
        }
      }
    }
  }
`;
