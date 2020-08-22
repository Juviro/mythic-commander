import { UnifiedCard } from 'types/unifiedTypes';

export default (cards: UnifiedCard[]) => {
  if (!cards) return 0;
  return cards.reduce((sum, { amount, totalAmount }) => {
    const usedAmount = amount || totalAmount || 1;
    return sum + Number(usedAmount);
  }, 0);
};
