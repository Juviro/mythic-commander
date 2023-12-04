export const pluralizeCards = (count: number, prefixOne?: boolean) => {
  if (prefixOne) {
    return count === 1 ? 'a card' : ` ${count} cards`;
  }
  return count === 1 ? 'card' : ` ${count} cards`;
};
