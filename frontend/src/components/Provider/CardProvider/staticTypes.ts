// Order determines which type is the primary type
export const CARD_TYPES = [
  'Land',
  'Creature',
  'Enchantment',
  'Artifact',
  'Planeswalker',
  'Sorcery',
  'Instant',
  'Battle',
] as const;

export const SUPER_TYPES = [
  ...CARD_TYPES,
  'Basic',
  'Legendary',
  'Snow',
  'World',
] as const;

export type CardType = (typeof CARD_TYPES)[number];

// Order determines order of deck categories
export const CARD_TYPE_DECK_ORDER = [
  'Creature',
  'Enchantment',
  'Artifact',
  'Planeswalker',
  'Battle',
  'Instant',
  'Sorcery',
  'Land',
] as const;
