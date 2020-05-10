export default cards => {
  if (!cards) return 0;
  return cards.reduce((sum, { amount, totalAmount }) => {
    const usedAmount = amount || totalAmount || 1;
    return sum + usedAmount;
  }, 0);
};
