import gql from 'graphql-tag';

export const CARD_FIELDS = `
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

export const cachedCards = gql`
  query cachedCards {
    cachedCards {
      i
      n
      s
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

export const searchCard = gql`
  query searchCard($query: String, $limit: Int) {
    searchCard(query: $query,limit: $limit) {
        ${CARD_FIELDS}
      }
    }
`;
