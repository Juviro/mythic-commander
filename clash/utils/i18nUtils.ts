export const pluralizeCards = (count: number, prefixOne = '') => {
  if (prefixOne) {
    return count === 1 ? `${prefixOne} card` : ` ${count} cards`;
  }
  return count === 1 ? 'card' : ` ${count} cards`;
};

export const getCardinalNumberLabel = (number: number, long?: boolean): string => {
  switch (number) {
    case 1:
      return long ? 'first' : '1st';
    case 2:
      return long ? 'second' : '2nd';
    case 3:
      return long ? 'third' : '3rd';
    case 4:
      return long ? 'fourth' : '4th';
    default:
      return `${number}th`;
  }
};
