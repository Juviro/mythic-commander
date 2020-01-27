export default `
  type Collection {
    id: String!
    cards: [Card!]!
  }

  type Card {
    id: String!
    set: String!
    name: String!
    image_uris: ImageUris
    card_faces: [CardFace]
    createdAt: String!
    prices: Prices!
    rarity: String
    legalities: Legalities!
    purchase_uris: PurchaseUris
    priceInEuro: Float
    priceLabel: String
    
    isFoil: Boolean
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
    name: String!
    image_uris: ImageUris
    colors: [String]
  }

  type ImageUris {
    normal: String
    small: String
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
    isFoil: Boolean
  }
`;
