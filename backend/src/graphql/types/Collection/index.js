export default `
  type Collection {
    id: String!
    set: String!
    name: String!
    image_uris: ImageUris
    card_faces: [CardFace]
    createdAt: String!
    
    isFoil: Boolean
  }

  type CardFace {
    name: String!
    image_uris: ImageUris!
  }

  type ImageUris {
    normal: String
  }

  type Query {
    collection: [Collection]!
  }

  type Mutation {
    addToCollectionById(cards: [AddCardsByIdInput]!): [Collection]!
    addToCollectionByName(cards: [AddCardsByNameInput]!): [Collection]!
  }

  input AddCardsByIdInput {
    id: String!
    isFoil: Boolean
    set: String
  }

  input AddCardsByNameInput {
    name: String!
    isFoil: Boolean
  }
`
