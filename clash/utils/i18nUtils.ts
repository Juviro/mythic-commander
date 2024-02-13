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

const options = { year: 'numeric', month: 'long', day: '2-digit' } as const;
const shortOptions = { year: '2-digit', month: '2-digit', day: '2-digit' } as const;

export const formatDate = (dateString: string, isShort = false) => {
  let date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    date = new Date(Number(dateString));
  }
  return new Date(date).toLocaleDateString('de-DE', isShort ? shortOptions : options);
};

export const formatTime = (dateString: string) => {
  let date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    date = new Date(Number(dateString));
  }
  return new Date(date)
    .toLocaleDateString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .split(', ')[1];
};
