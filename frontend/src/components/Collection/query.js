import gql from 'graphql-tag'

const CARD_FIELDS = `
  id
  set
  name
  createdAt
  image_uris {
    normal
  }
  card_faces {
    name
    image_uris {
      normal
    }
  }
  isFoil

`

export const getCollection = gql`
  query getCollection {
    collection {
      ${CARD_FIELDS}
    }
  }
`

export const addToCollectionByName = gql`
  mutation addToCollectionByName($cards: [AddCardsByNameInput]!) {
    addToCollectionByName(cards: $cards) {
      ${CARD_FIELDS}
    }
  }
`
