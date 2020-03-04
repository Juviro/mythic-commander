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
    changeCollection(added: [ChangeCollectionInput!], edited: [ChangeCollectionInput!], deleted: [String!]): Boolean
  }

  input ChangeCollectionInput {
    id: String!
    amount: Int
    amountFoil: Int
  }

  input AddCardsByIdInput {
    id: String!
    set: String
  }

  input AddCardsByNameInput {
    name: String!
    amount: Int
  }
`;
