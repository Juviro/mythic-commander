export const CARD_FIELDS_INITIAL = [
  {
    key: 'id',
    type: 'string',
  },
  {
    key: 'name',
    type: 'string',
  },
  {
    key: 'oracle_id',
    type: 'string',
  },
  {
    key: 'all_parts',
    specificType: 'JSONB[]',
  },
  {
    key: 'card_faces',
    specificType: 'JSONB[]',
  },
  {
    key: 'legalities',
    type: 'jsonb',
  },
  {
    key: 'image_uris',
    type: 'jsonb',
  },
  {
    key: 'prices',
    type: 'jsonb',
  },
  {
    key: 'colors',
    specificType: 'TEXT[]',
  },
  {
    key: 'color_identity',
    specificType: 'TEXT[]',
  },
  {
    key: 'foil',
    type: 'boolean',
  },
  {
    key: 'nonfoil',
    type: 'boolean',
  },
  {
    key: 'cmc',
    type: 'float',
  },
  {
    key: 'edhrec_rank',
    type: 'integer',
  },
  {
    key: 'rarity',
    type: 'string',
  },
  {
    key: 'mana_cost',
    type: 'string',
  },
  {
    key: 'oracle_text',
    type: 'string',
    length: 1000,
  },
  {
    key: 'power',
    type: 'string',
  },
  {
    key: 'toughness',
    type: 'string',
  },
  {
    key: 'type_line',
    type: 'string',
  },
  {
    key: 'set_name',
    type: 'string',
  },
  {
    key: 'set',
    type: 'string',
  },
  {
    key: 'rulings_uri',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_1 = [
  {
    key: 'released_at',
    type: 'date',
  },
  {
    key: 'booster',
    type: 'boolean',
  },
  {
    key: 'purchase_uris',
    type: 'jsonb',
  },
  {
    key: 'reprint',
    type: 'boolean',
  },
];

export const CARD_FIELDS_ADDITION_2 = [
  {
    key: 'layout',
    type: 'string',
  },
  {
    key: 'games',
    specificType: 'TEXT[]',
  },
  {
    key: 'full_art',
    type: 'boolean',
  },
  {
    key: 'frame',
    type: 'string',
  },
  {
    key: 'frame_effects',
    type: 'string',
  },
];
export const CARD_FIELDS_ADDITION_3 = [
  {
    key: 'multiverse_ids',
    specificType: 'TEXT[]',
  },
];
export const CARD_FIELDS_ADDITION_4 = [
  {
    key: 'promo',
    type: 'boolean',
  },
  {
    key: 'oversized',
    type: 'boolean',
  },
  {
    key: 'related_uris',
    type: 'jsonb',
  },
];
export const CARD_FIELDS_ADDITION_5 = [
  {
    key: 'scryfall_uri',
    type: 'string',
  },
];
export const CARD_FIELDS_ADDITION_6 = [
  {
    key: 'cardmarket_id',
    type: 'integer',
  },
  {
    key: 'cardmarket_prices',
    type: 'jsonb',
  },
];

export const CARD_FIELDS_ADDITION_7 = [
  {
    key: 'is_special',
    type: 'integer',
  },
];

export const CARD_FIELDS_ADDITION_8 = [
  {
    key: 'lang',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_9 = [
  {
    key: 'primary_variant',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_10 = [
  {
    key: 'collector_number',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_11 = [
  {
    key: 'produced_mana',
    specificType: 'TEXT[]',
  },
  {
    key: 'keywords',
    specificType: 'TEXT[]',
  },
  {
    key: 'finishes',
    specificType: 'TEXT[]',
  },
  {
    key: 'reserved',
    type: 'boolean',
  },
];

export const CARD_FIELDS_ADDITION_12 = [
  {
    key: 'promo_types',
    specificType: 'TEXT[]',
  },
  {
    key: 'border_color',
    type: 'string',
  },
  {
    key: 'set_type',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_13 = [
  {
    key: 'normalized_name',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_14 = [
  {
    key: 'variants',
    specificType: 'TEXT[]',
  },
];

export const CARD_FIELDS_ADDITION_15 = [
  {
    key: 'loyalty',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_16 = [
  {
    key: 'game_changer',
    type: 'boolean',
  },
  {
    key: 'variation',
    type: 'boolean',
  },
  {
    key: 'textless',
    type: 'boolean',
  },
  {
    key: 'story_spotlight',
    type: 'boolean',
  },
  {
    key: 'object',
    type: 'string',
  },
  {
    key: 'image_status',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_17 = [
  {
    key: 'front_name',
    type: 'string',
  },
];

export const CARD_FIELDS_ADDITION_18 = [
  {
    key: 'secret_lair_id',
    type: 'string',
  },
];

export const ALL_CARD_FIELDS = [
  CARD_FIELDS_INITIAL,
  CARD_FIELDS_ADDITION_1,
  CARD_FIELDS_ADDITION_2,
  CARD_FIELDS_ADDITION_3,
  CARD_FIELDS_ADDITION_4,
  CARD_FIELDS_ADDITION_5,
  CARD_FIELDS_ADDITION_6,
  CARD_FIELDS_ADDITION_7,
  CARD_FIELDS_ADDITION_8,
  CARD_FIELDS_ADDITION_9,
  CARD_FIELDS_ADDITION_10,
  CARD_FIELDS_ADDITION_11,
  CARD_FIELDS_ADDITION_12,
  CARD_FIELDS_ADDITION_13,
  CARD_FIELDS_ADDITION_14,
  CARD_FIELDS_ADDITION_15,
  CARD_FIELDS_ADDITION_16,
  CARD_FIELDS_ADDITION_17,
  CARD_FIELDS_ADDITION_18,
].flat();
