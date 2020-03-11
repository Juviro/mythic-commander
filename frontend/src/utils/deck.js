export const getNumberOfCards = cards => {
  if (!cards) return 0;
  return cards.reduce((acc, val) => acc + (Number(val.amount) || 1), 0);
};
