import gql from 'graphql-tag';

export const CARD_FIELDS = `
  id
  set
  name
  rarity
  createdAt
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
  isFoil
  priceInEuro
  priceLabel
  oracle_id
`;

const COLLECTION_FIELDS = `
  id
  cards {
    ${CARD_FIELDS}
  }
`;

export const getCollection = gql`
  query getCollection {
    collection {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollectionByName = gql`
  mutation addToCollectionByName($cards: [AddCardsByNameInput]!) {
    addToCollectionByName(cards: $cards) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const addToCollectionById = gql`
  mutation addToCollectionById($cards: [AddCardsByIdInput]!) {
    addToCollectionById(cards: $cards) {
      ${COLLECTION_FIELDS}
    }
  }
`;

export const deleteFromCollection = gql`
  mutation deleteFromCollection($cardIds: [String]!) {
    deleteFromCollection(cardIds: $cardIds) {
      ${COLLECTION_FIELDS}
    }
  }
`;
