const getColorProps = colorString => {
  const [filteredColors] = colorString.match(/(w|u|b|r|g)+$/) || [''];
  const excludeOtherColors = colorString.includes('-');
  const exactColors = colorString.includes('x');
  const colorList = filteredColors.toUpperCase().split('');
  return {
    colorList,
    excludeOtherColors,
    exactColors,
  };
};

const addColorClause = (q, colors) => {
  const { colorList, excludeOtherColors, exactColors } = getColorProps(colors);
  const placeholder = colorList.map(() => '?');

  if (!colorList) {
    q.whereRaw('cardinality(color_identity) = 0');
  } else if (exactColors) {
    q.whereRaw(
      `color_identity <@ ARRAY[${placeholder}]::text[] AND ARRAY[${placeholder}]::text[] <@ color_identity`,
      [colorList, colorList].flat()
    );
  } else if (excludeOtherColors) {
    q.whereRaw(`color_identity <@ ARRAY[${placeholder}]::text[]`, colorList);
  } else {
    q.whereRaw(`color_identity && ARRAY[${placeholder}]::text[]`, colorList);
  }
};

const addOwnedClause = (q, userId) => {
  q.whereRaw(
    `oracle_id IN (SELECT DISTINCT oracle_id FROM "collectionWithOracle" WHERE "userId" = ?)`,
    userId
  );
};

const getOrderColumn = orderBy => {
  switch (orderBy) {
    case 'price':
      return "coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0)";
    default:
      return `"${orderBy}"`;
  }
};

const addRangeClause = (q, encodedValue, columnName) => {
  // eslint-disable-next-line no-unused-vars
  const [_, from = '', __, to = ''] = encodedValue.match(/(\d*)(-)(\d*)/);

  if (from) q.whereRaw(`"${columnName}"::float >= ${from}`);
  if (to) q.whereRaw(`"${columnName}"::float <= ${to}`);
};

const addRarityClause = (q, rarity) => {
  const rarityMap = {
    m: 'mythic',
    r: 'rare',
    u: 'uncommon',
    c: 'common',
  };
  const rarities = rarity
    .split('')
    .map(letter => rarityMap[letter])
    .filter(Boolean);
  q.whereIn('rarity', rarities);
};

export default async (
  _,
  { offset = 0, limit = 30, options = {} },
  { db, user }
) => {
  const {
    colors = '',
    name,
    set,
    text,
    creatureType,
    cardType,
    isLegendary,
    isCommanderLegal,
    isOwned,
    toughness,
    power,
    cmc,
    rarity,
    orderBy = 'name-asc',
  } = options;

  const [order, direction = 'asc'] = orderBy.split('-');

  const database = set ? 'cards' : 'distinctCards';

  const query = db(database)
    .where(q => {
      if (name) q.where('name', 'ILIKE', `%${name}%`);
      if (text) q.where('oracle_text', 'ILIKE', `%${text}%`);
      if (creatureType) q.where('type_line', 'LIKE', `%${creatureType}%`);
      if (cardType) q.where('type_line', 'ILIKE', `%${cardType}%`);
      if (set) q.where('set', set);
      if (isCommanderLegal)
        q.whereRaw("(legalities->>'commander')::text = 'legal'");
      if (isLegendary === 'true') q.where('type_line', 'ILIKE', `%Legendary%`);
      if (isLegendary === 'false')
        q.whereNot('type_line', 'ILIKE', `%Legendary%`);
      if (colors.length) addColorClause(q, colors);
      if (isOwned && user) addOwnedClause(q, user.id);
      if (cmc) addRangeClause(q, cmc, 'cmc');
      if (power) addRangeClause(q, power, 'power');
      if (toughness) addRangeClause(q, toughness, 'toughness');
      if (rarity) addRarityClause(q, rarity);
    })
    .orderByRaw(`${getOrderColumn(order)} ${direction.toUpperCase()}`);

  console.log('query', query.toString());

  const cards = await query;

  const hasMore = cards.length > limit + offset;

  return {
    hasMore,
    totalResults: cards.length,
    nextOffset: hasMore ? offset + limit : null,
    cards: cards.slice(offset, offset + limit),
  };
};
