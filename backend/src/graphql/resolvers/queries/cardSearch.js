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

  if (exactColors) {
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

const addOwnedClause = (q, userId, isOwned) => {
  const operator = isOwned === 'true' ? 'IN' : 'NOT IN';
  q.whereRaw(
    `oracle_id ${operator} (SELECT DISTINCT oracle_id FROM "collectionWithOracle" WHERE "userId" = ?)`,
    userId
  );
};

export const getOrderColumn = orderBy => {
  switch (orderBy) {
    case '':
    case 'price':
      return "coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0)";
    case 'added':
      return '"createdAt"';
    case 'amount':
      return '"totalAmount"';
    default:
      return `"${orderBy}"`;
  }
};

const addRangeClause = (q, encodedValue, columnName) => {
  const [, from = '', , to = ''] = encodedValue.match(/(\d*)(-)(\d*)/);

  if (from) q.whereRaw(`try_cast_float("${columnName}") >= ${from}`);
  if (to) q.whereRaw(`try_cast_float("${columnName}") <= ${to}`);
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

export const addNameClause = (q, name) => {
  const searchPattern = name.split(' ').join('%');

  q.where('name', 'ILIKE', `%${searchPattern}%`);
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
    subType,
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

  const tableName = set ? 'distinctCardsPerSet' : 'distinctCards';

  const where = q => {
    if (name) addNameClause(q, name);
    if (text) q.where('oracle_text', 'ILIKE', `%${text}%`);
    if (subType) q.where('type_line', 'LIKE', `%${subType}%`);
    if (cardType) q.where('type_line', 'ILIKE', `%${cardType}%`);
    if (set) q.where('set', set);
    if (isCommanderLegal === 'true')
      q.whereRaw("(legalities->>'commander')::text = 'legal'");
    if (isCommanderLegal === 'false')
      q.whereRaw("(legalities->>'commander')::text = 'not_legal'");
    if (isLegendary === 'true') q.where('type_line', 'ILIKE', `%Legendary%`);
    if (isLegendary === 'false')
      q.whereNot('type_line', 'ILIKE', `%Legendary%`);
    if (colors.length) addColorClause(q, colors);
    if (isOwned && user) addOwnedClause(q, user.id, isOwned);
    if (cmc) addRangeClause(q, cmc, 'cmc');
    if (power) addRangeClause(q, power, 'power');
    if (toughness) addRangeClause(q, toughness, 'toughness');
    if (rarity) addRarityClause(q, rarity);
  };

  const cardQuery = db(tableName)
    .where(where)
    .limit(limit)
    .offset(offset)
    .orderByRaw(`${getOrderColumn(order)} ${direction.toUpperCase()}`);

  const countQuery = db(tableName)
    .where(where)
    .count('*')
    .first();

  const cards = await cardQuery;
  const { count } = await countQuery;

  const hasMore = count > limit + offset;

  return {
    cards,
    hasMore,
    totalResults: count,
    nextOffset: hasMore ? offset + limit : null,
  };
};
