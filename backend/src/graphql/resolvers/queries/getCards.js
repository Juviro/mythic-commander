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

const getOrderColumn = orderBy => {
  switch (orderBy) {
    case 'price':
      return "coalesce(LEAST((prices->>'usd')::float, (prices->>'usd_foil')::float), 0)";
    default:
      return `"${orderBy}"`;
  }
};

export default async (_, { offset = 0, limit = 30, options = {} }, { db }) => {
  const {
    colors = '',
    name,
    set,
    text,
    creatureType,
    cardType,
    isLegendary,
    isCommanderLegal,
    orderBy = 'name-asc',
  } = options;

  const [order, direction = 'asc'] = orderBy.split('-');

  const database = set ? 'cards' : 'distinctCards';

  const query = db(database)
    .where(q => {
      if (name) q.where('name', 'ILIKE', `%${name}%`);
      if (text) q.where('oracle_text', 'ILIKE', `%${text}%`);
      if (creatureType) q.where('type_line', 'ILIKE', `%${creatureType}%`);
      if (cardType) q.where('type_line', 'ILIKE', `%${cardType}%`);
      if (set) q.where('set', set);
      if (isCommanderLegal)
        q.whereRaw("(legalities->>'commander')::text = 'legal'");
      if (isLegendary === 'true') q.where('type_line', 'ILIKE', `%Legendary%`);
      if (isLegendary === 'false')
        q.whereNot('type_line', 'ILIKE', `%Legendary%`);
      if (colors.length) addColorClause(q, colors);
    })
    .orderByRaw(`${getOrderColumn(order)} ${direction.toUpperCase()}`);

  const cards = await query;

  const hasMore = cards.length > limit + offset;

  return {
    hasMore,
    totalResults: cards.length,
    nextOffset: hasMore ? offset + limit : null,
    cards: cards.slice(offset, offset + limit),
  };
};
