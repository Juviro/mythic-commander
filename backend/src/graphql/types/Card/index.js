export default `
  type Card {
    id: String!
    set: String!
    name: String!
    image_uris: ImageUris
    card_faces: [CardFace!]
    createdAt: String!
    prices: Prices!
    rarity: String
    legalities: Legalities!
    purchase_uris: PurchaseUris
    oracle_id: String!
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

  type CachedCard {
    i: String!
    n: String!
    s: String
  }

  type Query {
    cachedCards: [CachedCard!]!
    card(id: String!): Card
    searchCard(query: String, limit: Int): [Card!]!
    getCardByName(name: String!): Card
  }
`;
