export default `
  type SearchType {
    cards: [Card!]!
    decks: [Deck!]!
    collection: [Card!]!
  }

  type Query {
    search(query: String, limit: Int): SearchType!
  }
`;
