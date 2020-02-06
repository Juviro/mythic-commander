export default `
  type SearchType {
    cards: [Card!]!
    decks: [Deck!]!
    collection: [CollectionCard!]!
  }

  type Query {
    search(query: String, limit: Int): SearchType!
  }
`;
