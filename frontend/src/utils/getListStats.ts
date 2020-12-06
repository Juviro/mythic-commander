import { partition } from 'lodash';

import { UnifiedList } from 'types/unifiedTypes';
import { getPriceLabel } from './cardStats';
import sumCardAmount from './sumCardAmount';

export const getListStats = (list?: UnifiedList) => {
  if (!list) return {};

  const [ownedCards, unownedCards] = partition(list.cards, (card) => card.owned);

  const getValue = (cards) =>
    cards.reduce((acc, { minPrice, amount, totalAmount }) => {
      const usedAmount = Number(amount) ?? Number(totalAmount) ?? 0;
      return acc + minPrice * usedAmount;
    }, 0);

  const totalValue = getValue(list.cards);
  const ownedValue = getValue(ownedCards);
  const unownedValue = getValue(unownedCards);

  const unownedValueLabel = unownedValue
    ? ` (${getPriceLabel(unownedValue, { round: true })} not owned)`
    : '';

  const ownedValueLabel = getPriceLabel(totalValue, {
    round: true,
  });

  const valueLabel = `${ownedValueLabel}${unownedValueLabel}`;

  const numberOfCards = sumCardAmount(list?.cards);
  const numberOfUniqueCards = list?.cards.length;

  const uniqueAddon =
    numberOfUniqueCards === numberOfCards ? '' : `(${numberOfUniqueCards} Unique) `;

  const numberOfCardsLabel = `${numberOfCards} Cards ${uniqueAddon}`;

  return {
    totalValue,
    ownedValue,
    unownedValue,
    ownedValueLabel,
    valueLabel,

    numberOfCards,
    numberOfUniqueCards,
    numberOfCardsLabel,
  };
};
