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
    key: 'toughnes',
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

export const ALL_CARD_FIELDS = [
  CARD_FIELDS_INITIAL,
  CARD_FIELDS_ADDITION_1,
  CARD_FIELDS_ADDITION_2,
].flat();
