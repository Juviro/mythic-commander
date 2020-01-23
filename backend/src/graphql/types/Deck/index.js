export default `
  type Deck {
    id: String!
    name: String!
    createdAt: String!
    lastEdit: String!
    imgSrc: String
    numberOfCards: Int
    cards: [CardsType]!
  }

  type CardsType {
    id: String!
    oracle_id: String!
    set: String!
    name: String!
    image_uris: ImageUris
    card_faces: [CardFace]
    createdAt: String
    prices: Prices!
    rarity: String
    legalities: Legalities!
    purchase_uris: PurchaseUris
    isFoil: Boolean
    primaryTypes: [String]
    subTypes: [String]
    flipTypes: [String]
    colors: [String]
    color_identity: [String]
    all_sets: [String!]
    amount: Int
    
    zone: String!
    owned: Boolean
  }

  type PurchaseUris {
    tcgplayer: String
    cardmarket: String
  }

  type Prices {
    eur: String
    usd: String
    usd_foil: String
  }

  type Legalities {
    standard: String
    modern: String
    commander: String
  }

  type CardFace {
    colors: [String]
    name: String!
    image_uris: ImageUris
  }

  type ImageUris {
    normal: String
    small: String
    art_crop: String
  }

  type Query {
    decks: [Deck]!
    deck(id: String!): Deck!
  }

  type Mutation {
    createDeck: Deck!
    editDeck(deckId: String!, newProperties: EditDeckFieldsInput!): Deck!
    addCardsToDeck(input: AddCardsToDeckInputType): Deck!
    editDeckCard(cardOracleId: String!, deckId: String!, newProps: EditCardsPropsInput!): Deck!
    deleteFromDeck(cardId: String!, deckId: String!): Deck!
    deleteDeck(deckId: String!): Boolean
    duplicateDeck(deckId: String!): String!
  }

  input EditCardsPropsInput {
    set: String
    zone: String
    amount: Int
    owned: Boolean
  }
  
  input EditDeckFieldsInput {
    name: String
    imgSrc: String
  }

  input AddCardsToDeckInputType {
    cards: [String]!
    deckId: String!
  }
`;
