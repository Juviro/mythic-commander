export default `
  type Collection {
    id: String!
    isFoil: Boolean!
    set: String!
  }

  type Query {
    collection: [Collection]!
  }

  type Mutation {
    addToCollection(cards: [AddCardsInput]!): [Collection]!
  }

  input AddCardsInput {
    id: String!
    isFoil: Boolean!
    set: String!
  }
`
