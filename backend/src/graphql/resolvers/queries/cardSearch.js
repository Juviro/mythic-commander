import { normalizeName } from '../../../utils/normalizeName';

const getColorProps = (colorString) => {
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

const addOwnedClause = (
  q,
  userId,
  isOwned,
  tableName,
  sets,
  displayAllVariants
) => {
  const operator = isOwned === 'true' ? 'IN' : 'NOT IN';

  if (displayAllVariants) {
    q.whereRaw(
      `??.id ${operator} (SELECT id FROM collection WHERE "userId" = ?)`,
      [tableName, userId]
    );

    return;
  }

  if (sets?.length) {
    q.whereRaw(
      `??.oracle_id ${operator} (SELECT DISTINCT oracle_id FROM cards LEFT JOIN collection ON collection.id = cards.id WHERE "userId" = ? AND set IN (?))`,
      [tableName, userId, sets.join(',')]
    );

    return;
  }

  q.whereRaw(
    `??.oracle_id ${operator} (SELECT DISTINCT "collectionWithOracle".oracle_id FROM "collectionWithOracle" WHERE "userId" = ?)`,
    [tableName, userId]
  );
};

export const getOrderColumn = (orderBy, useCreatedAt = true) => {
  switch (orderBy) {
    case '':
    case 'priceEur':
      return "coalesce(LEAST((prices->>'eur')::float, (prices->>'eur_foil')::float, (prices->>'eur_etched')::float), 0)";
    case 'priceUsd':
      return "coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float, (prices->>'usd_etched')::float), 0)";
    case 'added':
      return useCreatedAt ? '"createdAt"' : 'released_at';
    case 'amount':
      return '"totalAmount"';
    case 'edhrec':
      return '"edhrec_rank"';
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
    .map((letter) => rarityMap[letter])
    .filter(Boolean);
  q.whereIn('rarity', rarities);
};

const addTagsClause = (q, tags) => {
  const placeholder = tags.map(() => '?');
  q.whereRaw(`tags && ARRAY[${placeholder}]::text[]`, tags);
};

const addVariantClause = (q, variants) => {
  const placeholder = variants.map(() => '?');
  q.whereRaw(`variants && ARRAY[${placeholder}]::text[]`, variants);
  q.whereNotIn('layout', [
    'token',
    'double_faced_token',
    'emblem',
    'planar',
    'vanguard',
    'scheme',
    'art_series',
  ]);
};

export const addNameClause = (q, name) => {
  const normalizedName = normalizeName(name);
  const searchPattern = normalizedName.split(' ').join('%');

  q.where('normalized_name', 'ILIKE', `%${searchPattern}%`);
};

const addTextClause = (q, text) => {
  const searchPattern = text.replace(/\s?\?\s?/g, '.*');

  q.where('oracle_text', '~*', `.*${searchPattern}.*`);
};

export default async (
  _,
  { offset = 0, limit = 30, options = {} },
  { db, user }
) => {
  const {
    colors = '',
    name,
    sets,
    text,
    subTypes,
    cardTypes,
    isLegendary,
    isCommanderLegal,
    isOwned,
    toughness,
    power,
    cmc,
    rarity,
    tags,
    variants,
    orderBy = 'name-asc',
    displayAllVariants,
  } = options;

  const [order, direction = 'asc'] = orderBy.split('-');

  let tableName = 'distinctCards';
  if (variants?.length || displayAllVariants) {
    tableName = 'cards';
  } else if (sets?.length) {
    tableName = 'distinctCardsPerSet';
  }

  const where = (q) => {
    q.whereNot('set_type', 'token');
    if (name) addNameClause(q, name);
    if (text) addTextClause(q, text);
    if (subTypes?.length)
      q.where(
        'type_line',
        '~*',
        subTypes.map((type) => ` ${type}( |$)`).join('|')
      );
    if (cardTypes?.length) {
      cardTypes.forEach((type) => {
        q.where('type_line', '~*', type);
      });
    }
    if (sets?.length) q.whereIn('set', sets);
    if (isCommanderLegal === 'true')
      q.whereRaw("(legalities->>'commander')::text = 'legal'");
    if (isCommanderLegal === 'false')
      q.whereRaw("(legalities->>'commander')::text <> 'legal'");
    if (isLegendary === 'true') q.where('type_line', 'ILIKE', `%Legendary%`);
    if (isLegendary === 'false')
      q.whereNot('type_line', 'ILIKE', `%Legendary%`);
    if (colors.length) addColorClause(q, colors);
    if (isOwned && user && user.id)
      addOwnedClause(q, user.id, isOwned, tableName, sets, displayAllVariants);
    if (cmc) addRangeClause(q, cmc, 'cmc');
    if (power) addRangeClause(q, power, 'power');
    if (toughness) addRangeClause(q, toughness, 'toughness');
    if (rarity) addRarityClause(q, rarity);
    if (tags?.length) addTagsClause(q, tags);
    if (variants?.length) addVariantClause(q, variants);
  };

  const cardQuery = db(tableName)
    .select(`${tableName}.*`, 'defaultTags.tags')
    .leftJoin('defaultTags', `${tableName}.oracle_id`, 'defaultTags.oracle_id')
    .where(where)
    .limit(limit)
    .offset(offset)
    .orderByRaw(
      `${getOrderColumn(
        order,
        false
      )} ${direction.toUpperCase()}, id ${direction.toUpperCase()}`
    );

  const countQuery = db(tableName)
    .leftJoin('defaultTags', `${tableName}.oracle_id`, 'defaultTags.oracle_id')
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
