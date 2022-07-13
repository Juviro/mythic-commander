import { UnifiedCard } from 'types/unifiedTypes';

export const trimName = (str: string) => {
  return (
    str
      .toLowerCase()
      // replaces token stats, e.g. Angel (4/4) -> Angel
      .replace(/\s\(.*\)/g, '')
      .replace(/[().*/\\^$+{},-:[\]]/g, '')
  );
};

export const filterByName = (cards: UnifiedCard[], searchString = ''): UnifiedCard[] => {
  if (!cards) return [];
  const cleanSearch = trimName(searchString);
  const searchRegExp = new RegExp(cleanSearch.split(' ').join('.*'));

  return cards.filter(({ name }) => {
    return searchRegExp.test(trimName(name));
  });
};

const filterByColor = (colorString = '') => ({ color_identity }: UnifiedCard) => {
  if (!color_identity) return true;
  const [filteredColors] = colorString.match(/(w|u|b|r|g)+$/) || [''];
  const isExclude = colorString.includes('-');
  const isExact = colorString.includes('x');

  const checkForColor = (color: string) =>
    color && filteredColors.includes(color.toLowerCase());
  const someMatches = !filteredColors || color_identity.some(checkForColor);
  const onlySelected = !filteredColors.length
    ? !color_identity.length
    : color_identity.length && color_identity.every(checkForColor);

  const hasAllColors = filteredColors
    .split('')
    .every((cardColor) => color_identity.includes(cardColor.toUpperCase()));

  if (isExact) return hasAllColors && onlySelected;
  if (isExclude) return onlySelected;
  return someMatches;
};

const filterBySubType = (subType: string) => ({ subTypes }: UnifiedCard) => {
  if (!subType) return true;
  if (!subTypes) return false;
  return subTypes.some((type) => type.toLowerCase() === subType.toLowerCase());
};

const filterByCardType = (cardType: string) => ({ primaryTypes }: UnifiedCard) => {
  if (!cardType) return true;
  if (!primaryTypes) return false;
  return primaryTypes.some((type) => type.toLowerCase() === cardType.toLowerCase());
};
const filterByLegendary = (isLegendary: string) => ({ primaryTypes }: UnifiedCard) => {
  if (!isLegendary) return true;
  if (!primaryTypes) return isLegendary === 'false';
  const isCardLegendary = primaryTypes.includes('Legendary');
  return isLegendary === 'true' ? isCardLegendary : !isCardLegendary;
};
const filterByAddedWithin = (addedWithin?: number) => ({ createdAt }: UnifiedCard) => {
  if (!addedWithin || !createdAt) return true;
  const spanInMillies = addedWithin * 60 * 60 * 1000;
  return Date.now() - spanInMillies < Number(createdAt);
};

interface FilterOptions {
  name?: string;
  colors?: string;
  subType?: string;
  cardType?: string;
  isLegendary?: string;
  addedWithin?: number;
}

export const filterCards = (
  cards: UnifiedCard[],
  { name, colors, subType, cardType, isLegendary, addedWithin }: FilterOptions
) => {
  return filterByName(cards, name)
    .filter(filterByAddedWithin(addedWithin))
    .filter(filterByColor(colors))
    .filter(filterByCardType(cardType))
    .filter(filterByLegendary(isLegendary))
    .filter(filterBySubType(subType));
};

export const sortCardsBySearch = (searchString = '') => (
  { name: cardA, primary_variant: pvA }: UnifiedCard,
  { name: cardB, primary_variant: pvB }: UnifiedCard
) => {
  if (cardA === cardB) {
    if (pvA && !pvB) return 1;
    if (pvB && !pvA) return -1;
    return pvA ? pvA.localeCompare(pvB) : 0;
  }

  const cleanSearch = trimName(searchString);
  const cleanCardNameA = trimName(cardA);
  const cleanCardNameB = trimName(cardB);
  if (!cleanSearch) return cleanCardNameA > cleanCardNameB ? 1 : -1;

  if (cleanCardNameB === cleanSearch) return 1;
  if (cleanCardNameA === cleanSearch) return -1;
  if (cleanCardNameB.startsWith(cleanSearch)) return 1;
  if (cleanCardNameA.startsWith(cleanSearch)) return -1;
  if (cleanCardNameB.indexOf(cleanSearch) > 0) return 1;
  if (cleanCardNameA.indexOf(cleanSearch) > 0) return -1;
  if (cleanCardNameB[0] === cleanSearch[0]) return 1;
  if (cleanCardNameA[0] === cleanSearch[0]) return -1;
  if (cardA > cardB) return 1;
  if (cardB > cardA) return -1;

  return 0;
};

export const filterAndSortByQuery = (cards, searchString) => {
  return filterByName(cards, searchString).sort(sortCardsBySearch(searchString));
};

export const sortByAdded = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => a.createdAt - b.createdAt);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

export const sortByCmc = (cards, direction = 'asc') => {
  const sortedCards = [...cards].sort((a, b) => a.cmc - b.cmc);

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

export const sortByName = (cards, direction = 'asc') => {
  const sortedCards = [...cards].sort((a, b) => (a.name < b.name ? -1 : 1));

  return direction === 'asc' ? sortedCards : sortedCards.reverse();
};

const sortByPrice = (cards, direction = 'asc') => {
  const sortedCards = cards.sort((a, b) => a.minPriceUsd - b.minPriceUsd);

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
