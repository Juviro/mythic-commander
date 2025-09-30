const premiumFrameEffects = [
  'extendedart',
  'fullart',
  'showcase',
  'inverted',
  'etched',
  'compasslanddfc',
];

// Try to find the main variant of a card
// For most cards, this will be set by isSpecialForDistinctCards to -1
export const isSpecialCard = (card) => {
  if (card.promo_types?.includes('boxtopper')) {
    return 4;
  }
  if (
    card.frame_effects &&
    premiumFrameEffects.some((effect) => card.frame_effects.includes(effect))
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

export const getAllSets = async (oracle_id, db, userId = '') => {
  const { rows: cards } = await db.raw(
    `
      SELECT 
        cards.*,
        "secretLair".name as "secretLairName", 
        "secretLair".id as "secretLairId",
        coalesce(collection.amount,0) as "amountOwned", 
        coalesce(collection."amountFoil",0) as "amountOwnedFoil" 
      FROM cards 
      LEFT JOIN collection
        ON collection.id = cards.id
        AND collection."userId" = ?
      LEFT JOIN "secretLair"
	  	  ON "secretLair".id = cards.secret_lair_id
      WHERE cards.oracle_id = ? 
      AND 'paper' = ANY(games)
      ORDER BY 
      	cards.set_name, cards.id;
      `,
    [userId, oracle_id]
  );

  const sortedCards = cards.sort(sortSets);

  return sortedCards.map((card) => {
    if (card.secretLairName) {
      return {
        ...card,
        set_name: `Secret Lair: ${card.secretLairName}`,
        secret_lair_id: card.secretLairId,
      };
    }
    const cardsWithSameSet = sortedCards.filter(({ set }) => set === card.set);

    if (cardsWithSameSet.length === 1) return card;
    // No version indicator for the first card, which we assume is the main card, unless it has a variant
    if (cardsWithSameSet[0].id === card.id && !card.primary_variant) {
      return card;
    }

    const version = cardsWithSameSet.findIndex(({ id }) => id === card.id) + 1;

    const versionSuffix = card.primary_variant ?? `Version ${version}`;

    return {
      ...card,
      set_name: `${card.set_name} (${versionSuffix})`,
    };
  });
};

export const getOwnedCardsByOracleId = async (oracle_id, db, userId) => {
  const cards = await db('collectionWithOracle')
    .where({
      'cards.oracle_id': oracle_id,
      userId,
    })
    .leftJoin('cards', 'cards.id', 'collectionWithOracle.id');

  return cards;
};

export const getTypes = ({ type_line }) => {
  const [mainTypes, flipTypes] = type_line.split(' // ');
  const [primaryTypes, subTypes] = mainTypes
    .split(' — ')
    .map((part) => part.split(' '));

  return { mainTypes, flipTypes, primaryTypes, subTypes };
};

export const getImageKey = ({ image_uris, card_faces }) => {
  const cardFront = image_uris || card_faces[0].image_uris;

  const cardMatch = cardFront.small.match(/front\/(.*)\//);

  if (!cardMatch) return '';

  return cardMatch[1];
};

export const padCollectorNumber = (number) => {
  if (number.length === 1) return `00${number}`;
  if (number.length === 2) return `0${number}`;
  return number;
};
