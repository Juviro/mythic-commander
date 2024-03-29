import { partition } from 'lodash';

import { UnifiedCard } from 'types/unifiedTypes';
import { getPriceLabel } from './cardStats';
import sumCardAmount from './sumCardAmount';

export const getListStats = (list?: { cards: UnifiedCard[] }) => {
  if (!list) return {};

  const [ownedCards, unownedCards] = partition(
    list.cards,
    (card: UnifiedCard) => card.owned
  );

  const { numberOfNoEurPrice, numberOfNoUsdPrice } = list.cards.reduce(
    // @ts-ignore: amount does not exists for some lists (collection) which is okay
    (acc, { minPriceEur, minPriceUsd, amount, totalAmount }) => {
      const current = { ...acc };
      const usedAmount = Number(amount) ?? Number(totalAmount) ?? 0;
      if (!minPriceEur) current.numberOfNoEurPrice += usedAmount;
      if (!minPriceUsd) current.numberOfNoUsdPrice += usedAmount;
      return current;
    },
    { numberOfNoEurPrice: 0, numberOfNoUsdPrice: 0 }
  );

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

  const unownedValueLabelUsd = unownedValue.usd
    ? ` (${getPriceLabel(unownedValue.usd, { round: true })} not owned)`
    : '';
  const unownedValueLabelEur = unownedValue.eur
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
  const numberOfUnownedCards = sumCardAmount(unownedCards);
  const numberOfUniqueCards = list?.cards.length;

  const uniqueAddon =
    numberOfUniqueCards === numberOfCards ? '' : `(${numberOfUniqueCards} Unique) `;

  const numberOfCardsLabel = `${numberOfCards} Cards ${uniqueAddon}`;

  return {
    totalValue,
    ownedValue,
    unownedValue,
    ownedValueLabelUsd,
    ownedValueLabelEur,
    valueLabelUsd,
    valueLabelEur,

    numberOfCards,
    numberOfUnownedCards,
    numberOfUniqueCards,
    numberOfCardsLabel,

    numberOfNoEurPrice,
    numberOfNoUsdPrice,
  };
};
