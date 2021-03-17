const formatCard = card => {
  const formatKey = key =>
    key
      .toLowerCase()
      .replace(/\+/g, ' plus')
      .replace(/\s/g, '_');
  const formatValue = value => {
    if (typeof value === 'string') return value;

    return Object.values(value)[0];
  };

  return Object.entries(card).reduce((acc, [key, value]) => {
    const formattedValue = formatValue(value);
    const formattedKey = formatKey(key);
    return { ...acc, [formattedKey]: formattedValue };
  }, {});
};

export const formatCards = cards => cards.map(formatCard);
