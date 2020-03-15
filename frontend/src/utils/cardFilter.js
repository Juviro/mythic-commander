const MAX_RESULTS = 30;

const trimName = str => {
  return str.replace(/[,';"().\s]+/g, '').toLowerCase();
};

// @Params card: string[] | { name: string }[]
export const filterByName = (cards, searchString = '') => {
  const cleanSearch = trimName(searchString);
  const searchRegExp = new RegExp(cleanSearch.split('').join('.*'));

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

export const filterCards = (cards, { search, colors }) => {
  return filterByName(cards, search).filter(filterByColor(colors));
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
