const MAX_RESULTS = 30;

const trimName = str => {
  return str.replace(/[,';"().\s]+/g, '').toLowerCase();
};

export const filterCards = (cards, searchString = '') => {
  const cleanSearch = trimName(searchString);
  const searchRegExp = new RegExp(cleanSearch.split('').join('.*'));

  return cards.filter(({ name }) => {
    const cardParts = searchString.includes('/') ? [name] : name.split(' // ');
    return cardParts.some(cardPart => searchRegExp.test(trimName(cardPart)));
  });
};

export default (cardNames, searchString) => {
  const cleanSearch = trimName(searchString);
  const foundCards = filterCards(
    cardNames.map(name => ({ name })),
    searchString
  ).map(({ name }) => name);

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
      : cleanCardNameA[0] === cleanSearch[0]
      ? -1
      : cleanCardNameB[0] === cleanSearch[0]
      ? 1
      : cleanCardNameA < cleanCardNameB
      ? -1
      : 1;
  };
  return foundCards.sort(sortCards).slice(0, MAX_RESULTS);
};
