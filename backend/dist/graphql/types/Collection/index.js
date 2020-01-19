"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n  type Collection {\n    id: String!\n    cards: [Card!]!\n  }\n\n  type Card {\n    id: String!\n    set: String!\n    name: String!\n    image_uris: ImageUris\n    card_faces: [CardFace]\n    createdAt: String!\n    prices: Prices!\n    rarity: String\n    legalities: Legalities!\n    purchase_uris: PurchaseUris\n    \n    isFoil: Boolean\n  }\n\n  type PurchaseUris {\n    tcgplayer: String\n    cardmarket: String\n  }\n\n  type Prices {\n    eur: String\n    usd: String\n    usd_foil: String\n  }\n\n  type Legalities {\n    standard: String\n    modern: String\n    commander: String\n  }\n\n  type CardFace {\n    name: String!\n    image_uris: ImageUris\n    colors: [String]\n  }\n\n  type ImageUris {\n    normal: String\n    small: String\n  }\n\n  type Query {\n    collection: Collection!\n  }\n\n  type Mutation {\n    addToCollectionById(cards: [AddCardsByIdInput]!): Collection!\n    addToCollectionByName(cards: [AddCardsByNameInput]!): Collection!\n    deleteFromCollection(cardIds: [String]!): Collection!\n  }\n\n  input AddCardsByIdInput {\n    id: String!\n    isFoil: Boolean\n    set: String\n  }\n\n  input AddCardsByNameInput {\n    name: String!\n    isFoil: Boolean\n  }\n";
exports.default = _default;