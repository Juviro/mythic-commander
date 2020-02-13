export default `
  type Card {
    id: String!
    set: String!
    name: String!
    image_uris: ImageUris
    card_faces: [CardFace!]
    prices: Prices!
    rarity: String!
    legalities: Legalities!
    purchase_uris: PurchaseUris!
    oracle_id: String!
    rulings_uri: String!
    colors: [String]
    color_identity: [String]

    createdAt: String
    zone: String
    owned: Boolean
    amount: Int
    isFoil: Boolean
    priceInEuro: Float
    priceLabel: String
    all_sets: [Set!]

    primaryTypes: [String]
    subTypes: [String]
    flipTypes: [String]
  }

  type Set {
    id: String!
    set: String!
    prices: Prices!
    image_uris: ImageUris
    card_faces: [CardFace!]
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
    small: String
    normal: String
    art_crop: String
  }

  type CachedCard {
    i: String!
    n: String!
    o: String!
    s: String
  }

  type CardsByOracle {
    name: String!
    oracle_id: String!
    rulings_uri: String!
    legalities: Legalities!
    
    all_sets: [OracleCard!]!
  }
  
  type OracleCard {
    id: String!
    set: String!
    set_name: String!
    prices: Prices!
    amount: Int!
    amountFoil: Int!
    foil: Boolean!
    nonfoil: Boolean!
    image_uris: [ImageUris]!
    purchase_uris: PurchaseUris!
  }

  type Owned {
    foil: Int!
    nonfoil: Int!
  }

  type Query {
    card(id: String!): Card
    cachedCards: [CachedCard!]!
    cardsByOracleId(oracle_id: String!): CardsByOracle
    searchCard(query: String, limit: Int): [Card!]!
  }
`;
