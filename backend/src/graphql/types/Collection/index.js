export default `
  type Collection {
    id: String!
    cards: [Card!]!
  }

  type Query {
    collection: Collection!
  }

  type Mutation {
    addToCollectionById(cards: [AddCardsByIdInput]!): Collection!
    addToCollectionByName(cards: [AddCardsByNameInput]!): Collection!
    deleteFromCollection(cardIds: [String]!): Collection!
  }

  input AddCardsByIdInput {
    id: String!
    isFoil: Boolean
    set: String
  }

  input AddCardsByNameInput {
    name: String!
    amount: Int
    isFoil: Boolean
  }
`;
