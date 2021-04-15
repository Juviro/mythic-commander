import { partition } from 'lodash';

import { UnifiedList } from 'types/unifiedTypes';
import { getPriceLabel } from './cardStats';
import sumCardAmount from './sumCardAmount';

export const getListStats = (list?: UnifiedList) => {
  if (!list) return {};

  const [ownedCards, unownedCards] = partition(list.cards, (card) => card.owned);

  const getValue = (cards) =>
    cards.reduce(
      ({ usd, eur }, { minPriceEur, minPriceUsd, amount, totalAmount }) => {
        const usedAmount = Number(amount) ?? Number(totalAmount) ?? 0;
        return {
          usd: usd + minPriceUsd * usedAmount,
          eur: eur + minPriceEur * usedAmount,
        };
      },
      { usd: 0, eur: 0 }
    );

  const totalValue = getValue(list.cards);
  const ownedValue = getValue(ownedCards);
  const unownedValue = getValue(unownedCards);

  const unownedValueLabelUsd = unownedValue
    ? ` (${getPriceLabel(unownedValue.usd, { round: true })} not owned)`
    : '';
  const unownedValueLabelEur = unownedValue
    ? ` (${getPriceLabel(unownedValue.eur, { round: true, currency: 'EUR' })} not owned)`
    : '';

  const ownedValueLabelUsd = getPriceLabel(totalValue.usd, {
    round: true,
  });
  const ownedValueLabelEur = getPriceLabel(totalValue.eur, {
    round: true,
    currency: 'EUR',
  });

  const valueLabelUsd = `${ownedValueLabelUsd}${unownedValueLabelUsd}`;
  const valueLabelEur = `${ownedValueLabelEur}${unownedValueLabelEur}`;

  const numberOfCards = sumCardAmount(list?.cards);
  const numberOfUniqueCards = list?.cards.length;

  const uniqueAddon =
    numberOfUniqueCards === numberOfCards ? '' : `(${numberOfUniqueCards} Unique) `;

  const numberOfCardsLabel = `${numberOfCards} Cards ${uniqueAddon}`;

  return {
    totalValue, // Number, sum of TODO doc this
    ownedValue,
    unownedValue,
    ownedValueLabelUsd,
    ownedValueLabelEur,
    valueLabelUsd,
    valueLabelEur,

    numberOfCards,
    numberOfUniqueCards,
    numberOfCardsLabel,
  };
};
