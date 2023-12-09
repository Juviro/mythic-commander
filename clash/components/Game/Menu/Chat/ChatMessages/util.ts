export const pluralizeCards = (count: number, prefixOne = '') => {
  if (prefixOne) {
    return count === 1 ? `${prefixOne} card` : ` ${count} cards`;
  }
  return count === 1 ? 'card' : ` ${count} cards`;
};
