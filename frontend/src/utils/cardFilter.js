const MAX_RESULTS = 30;

const trimName = str => {
  return str.replace(/[,';"().\][*]+/g, '').toLowerCase();
};

// @Params card: string[] | { name: string }[]
export const filterByName = (cards, searchString = '') => {
  if (!cards) return [];
  const cleanSearch = trimName(searchString);
  const searchRegExp = new RegExp(cleanSearch.split(' ').join('.*'));

  return cards.filter(card => {
    const name = typeof card === 'string' ? card : card.name;
    const cardParts = searchString.includes('/') ? [name] : name.split(' // ');
    return cardParts.some(cardPart => searchRegExp.test(trimName(cardPart)));
  });
};

const filterByColor = (colorString = '') => ({ color_identity }) => {
  if (!color_identity) return true;
  const [filteredColors] = colorString.match(/(w|u|b|r|g)+$/) || [''];
  const isExclude = colorString.includes('-');
  const isExact = colorString.includes('x');

  const checkForColor = color =>
    color && filteredColors.includes(color.toLowerCase());
  const someMatches = !filteredColors || color_identity.some(checkForColor);
  const onlySelected = !filteredColors.length
    ? !color_identity.length
    : color_identity.length && color_identity.every(checkForColor);

  const hasAllColors = filteredColors
    .split('')
    .every(cardColor => color_identity.includes(cardColor.toUpperCase()));

  if (isExact) return hasAllColors && onlySelected;
  if (isExclude) return onlySelected;
  return someMatches;
};

const filterByCreatureType = creatureType => ({ subTypes }) => {
  if (!creatureType) return true;
  if (!subTypes) return false;
  return subTypes.some(
    type => type.toLowerCase() === creatureType.toLowerCase()
  );
};

const filterByCardType = cardType => ({ primaryTypes }) => {
  if (!cardType) return true;
  if (!primaryTypes) return false;
  return primaryTypes.some(
    type => type.toLowerCase() === cardType.toLowerCase()
  );
};
const filterByLegendary = isLegendary => ({ primaryTypes }) => {
  if (!isLegendary) return true;
  if (!primaryTypes) return isLegendary === 'false';
  const isCardLegendary = primaryTypes.includes('Legendary');
  return isLegendary === 'true' ? isCardLegendary : !isCardLegendary;
};
const filterByAddedWithin = addedWithin => ({ createdAt }) => {
  if (!addedWithin || !createdAt) return true;
  const spanInMillies = addedWithin * 60 * 60 * 1000;
  return Date.now() - spanInMillies < createdAt;
};

export const filterCards = (
  cards,
  { name, colors, creatureType, cardType, isLegendary, addedWithin }
) => {
  return filterByName(cards, name)
    .filter(filterByAddedWithin(addedWithin))
    .filter(filterByColor(colors))
    .filter(filterByCardType(cardType))
    .filter(filterByLegendary(isLegendary))
    .filter(filterByCreatureType(creatureType));
};

export const sortCardsBySearch = (searchString = '') => (
  { name: cardA },
  { name: cardB }
) => {
  const cleanSearch = trimName(searchString);
  const cleanCardNameA = trimName(cardA);
  const cleanCardNameB = trimName(cardB);
  if (!cleanSearch) return cleanCardNameA > cleanCardNameB ? 1 : -1;

  return cleanCardNameA === cleanSearch
    ? -1
    : cleanCardNameB === cleanSearch
    ? 1
    : cleanCardNameB.startsWith(cleanSearch)
    ? 1
    : cleanCardNameA.startsWith(cleanSearch)
    ? -1
    : cleanCardNameB.indexOf(cleanSearch) > 0
    ? 1
    : cleanCardNameA.indexOf(cleanSearch) > 0
    ? -1
    : cleanCardNameA[0] === cleanSearch[0]
    ? -1
    : cleanCardNameB[0] === cleanSearch[0]
    ? 1
    : cardA > cardB
    ? -1
    : 1;
};

export const filterAndSortByQuery = (
  cards,
  searchString,
  maxResults = MAX_RESULTS
) => {
  return filterByName(cards, searchString)
    .sort(sortCardsBySearch(searchString))
    .slice(0, maxResults);
};

const sortByAdded = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => a.createdAt - b.createdAt);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const sortByCmc = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => a.cmc - b.cmc);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const sortByName = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => (a.name < b.name ? -1 : 1));

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const sortByPrice = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => a.minPrice - b.minPrice);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const sortByAmount = (cards, direction = 'asc') => {
  const sortedCards = cards.sort(
    (a, b) => (a.amount || a.totalAmount) - (b.amount || b.totalAmount)
  );

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const COLOR_ORDER = ['W', 'U', 'B', 'R', 'G'];
export const byColor = (
  { color_identity: colorsA, cmc: cmcA },
  { color_identity: colorsB, cmc: cmcB }
) => {
  if (colorsA.length !== colorsB.length) {
    return colorsA.length - colorsB.length;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const color of COLOR_ORDER) {
    if (colorsA.includes(color) !== colorsB.includes(color)) {
      return colorsA.includes(color) ? -1 : 1;
    }
  }

  return cmcA - cmcB;
};

const sortByColor = (cards, direction = 'asc') => {
  const sortedCards = cards.sort(byColor);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

export const sortCards = (cards, orderBy = '') => {
  const [order, direction = 'asc'] = orderBy.split('-');
  switch (order) {
    case 'cmc':
      return sortByCmc(cards, direction);
    case 'added':
      return sortByAdded(cards, direction);
    case 'name':
      return sortByName(cards, direction);
    case 'price':
      return sortByPrice(cards, direction);
    case 'color':
      return sortByColor(cards, direction);
    case 'amount':
      return sortByAmount(cards, direction);
    default:
      return cards;
  }
};
