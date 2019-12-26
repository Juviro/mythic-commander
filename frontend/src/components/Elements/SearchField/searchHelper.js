const MAX_RESULTS = 30;

export const filterNames = (cardNames, searchString) => {
  const trimName = str => str.replace(/[\W]/g, '').toLowerCase();

  const cleanSearch = trimName(searchString);
  const searchRegExp = new RegExp(cleanSearch.split('').join('.*'));

  const foundCards = cardNames.filter(name => searchRegExp.test(trimName(name)));

  const sortCards = (cardA, cardB) => {
    const cleanCardNameA = trimName(cardA);
    const cleanCardNameB = trimName(cardB);
    if (!searchString) return cleanCardNameA > cleanCardNameB ? 1 : -1;

    return cleanCardNameA === cleanSearch
      ? -1
      : cleanCardNameB === cleanSearch
      ? 1
      : cleanCardNameA.startsWith(cleanSearch)
      ? -1
      : cleanCardNameB.startsWith(cleanSearch)
      ? 1
      : cleanCardNameA.indexOf(cleanSearch) > 0
      ? -1
      : cleanCardNameB.indexOf(cleanSearch) > 0
      ? 1
      : cleanCardNameA > cleanCardNameB
      ? -1
      : 1;
  };
  return foundCards.sort(sortCards).slice(0, MAX_RESULTS);
};
