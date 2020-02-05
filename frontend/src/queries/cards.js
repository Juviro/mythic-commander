import gql from 'graphql-tag';

const CARD_FIELDS = `
  id
  set
  name
  rarity
  image_uris {
    small
    normal
    art_crop
  }
  card_faces {
    name
    image_uris {
      small
      normal
      art_crop
    }
    colors
  }
  prices {
    eur
    usd
    usd_foil
  }
  legalities {
    standard
    modern
    commander
  }
  oracle_id
`;

export const getCards = gql`
  query getCards {
    cards {
      id
      name
      image_uris {
        small
      }
    }
  }
`;

export const getCardByName = gql`
  query getCard($name: String!) {
    getCardByName(name: $name) {
        ${CARD_FIELDS}
      }
    }
`;

export const getCard = gql`
  query getCard($id: String!) {
      card(id: $id) {
        ${CARD_FIELDS}
      }
    }
`;
