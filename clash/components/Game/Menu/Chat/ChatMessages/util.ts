export const pluralizeCards = (count: number, prefixOne = '') => {
  if (prefixOne) {
    return count === 1 ? `${prefixOne} card` : ` ${count} cards`;
  }
  return count === 1 ? 'card' : ` ${count} cards`;
};

export const getNthLabel = (n: number) => {
  if (n === 1) {
    return '1st';
  }
  if (n === 2) {
    return '2nd';
  }
  if (n === 3) {
    return '3rd';
  }
  return `${n}th`;
};
