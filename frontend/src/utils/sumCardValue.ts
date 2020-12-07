type CardType = {
  amount?: string | number;
  minPrice: number;
};

export default (cards?: CardType[]): number => {
  if (!cards) return 0;

  return cards.reduce((sum, { minPrice, amount }) => sum + minPrice * Number(amount), 0);
};
