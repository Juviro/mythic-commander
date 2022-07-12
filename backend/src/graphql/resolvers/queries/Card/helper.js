const premiumFrameEffects = [
  'extendedart',
  'fullart',
  'showcase',
  'inverted',
  'etched',
  'compasslanddfc',
];

export const isSpecialCard = card => {
  if (
    card.frame_effects &&
    premiumFrameEffects.some(effect => card.frame_effects.includes(effect))
  ) {
    return 3;
  }
  if (card.lang !== 'en') return 2;
  if (card.booster === false) return 1;

  return 0;
};

const sortSets = (a, b) => {
  if (a.set_name !== b.set_name) {
    return a.set_name.localeCompare(b.set_name);
  }
  if (a.primary_variant !== b.primary_variant) {
    if (!a.primary_variant) return -1;
    if (!b.primary_variant) return 1;
    return a.primary_variant.localeCompare(b.primary_variant);
  }

  return a.is_special - b.is_special;
};

export const getAllSets = async (oracle_id, userId = '', db) => {
  const { rows: cards } = await db.raw(
    `
      SELECT 
        cards.*, 
        coalesce(collection.amount,0) as "amountOwned", 
        coalesce(collection."amountFoil",0) as "amountOwnedFoil" 
      FROM cards 
      LEFT JOIN collection
        ON collection.id = cards.id
        AND collection."userId" = ?
      WHERE cards.oracle_id = ? 
      AND 'paper' = ANY(games);
      `,
    [userId, oracle_id]
  );

  const sortedCards = cards.sort(sortSets);

  return sortedCards.map(card => {
    const cardsWithSameSet = sortedCards.filter(({ set }) => set === card.set);

    if (cardsWithSameSet.length === 1) return card;
    // No version indicator for the first card, which we assume is the main card, unless it's has a variant
    if (cardsWithSameSet[0].id === card.id && !card.primary_variant)
      return card;

    const version = cardsWithSameSet.findIndex(({ id }) => id === card.id) + 1;

    const versionSuffix = card.primary_variant ?? `Version ${version}`;

    return {
      ...card,
      set_name: `${card.set_name} (${versionSuffix})`,
    };
  });
};

export const getTypes = ({ type_line }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes
    .split(' — ')
    .map(part => part.split(' '));

  return { mainTypes, flipTypes, primaryTypes, subTypes };
};

export const getImageKey = ({ image_uris, card_faces }) => {
  const cardFront = image_uris || card_faces[0].image_uris;

  const cardMatch = cardFront.small.match(/front\/(.*)\//);

  if (!cardMatch) return '';

  return cardMatch[1];
};

export const getMainVariant = ({
  finishes,
  border_color,
  full_art,
  textless,
  frame_effects,
  promo_types,
  frame,
  released_at,
  lang,
}) => {
  if (lang === 'ja') {
    return 'Japanese';
  }
  if (promo_types?.includes('textured')) {
    return 'Textured';
  }
  if (border_color === 'borderless') {
    return 'Borderless';
  }
  if (full_art === true) {
    return 'Full Art';
  }
  if (frame_effects?.includes('showcase')) {
    return 'Showcase';
  }
  if (frame_effects?.includes('extendedart')) {
    return 'Extended Art';
  }
  if (finishes?.length === 1 && finishes[0] === 'etched') {
    return 'Etched Foil';
  }
  if (frame === 'future') {
    return 'Future Frame';
  }
  if (frame === 'future') {
    return 'Future Frame';
  }
  if (parseInt(frame) < 2000 && new Date(released_at).getFullYear() > 2020) {
    return 'Retro Frame';
  }
  if (textless === true) {
    return 'Textless';
  }

  return null;
};
