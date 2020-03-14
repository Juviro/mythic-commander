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

export const sortCards = searchString => ({ name: cardA }, { name: cardB }) => {
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

export default (cards, searchString, maxResults = MAX_RESULTS) => {
  return filterByName(cards, searchString)
    .sort(sortCards(searchString))
    .slice(0, maxResults);
};
