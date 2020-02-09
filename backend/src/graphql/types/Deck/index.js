export default `
  type Deck {
    id: String!
    name: String!
    createdAt: String!
    lastEdit: String!
    imgSrc: String
    cards: [Card]!
  }

  
  type Query {
    decks: [Deck]!
    deck(id: String!): Deck!
  }

  type Mutation {
    createDeck: Deck!
    editDeck(deckId: String!, newProperties: EditDeckFieldsInput!): Deck!
    addCardsToDeck(input: AddCardsToDeckInputType): Deck!
    editDeckCard(cardOracleId: String!, deckId: String!, newProps: EditCardsPropsInput!): Card!
    deleteFromDeck(cardId: String!, deckId: String!): Deck!
    deleteDeck(deckId: String!): Boolean
    duplicateDeck(deckId: String!): String!
  }

  input EditCardsPropsInput {
    id: String
    zone: String
    amount: Int
    owned: Boolean
  }
  
  input EditDeckFieldsInput {
    name: String
    imgSrc: String
  }

  input AddCardsToDeckInputType {
    cards: [CardInputType]!
    deckId: String!
  }

  input CardInputType {
    name: String!
    amount: Int
  }
`;
