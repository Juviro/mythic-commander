type CardType = {
  amount?: string | number;
  totalAmount?: string | number;
};

export default (cards?: CardType[]): number => {
  if (!cards) return 0;

  return cards.reduce((sum, { amount, totalAmount }) => {
    const usedAmount = amount || totalAmount || 1;
    return sum + Number(usedAmount);
  }, 0);
};
