import { Tooltip } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import PurchaseIcon from 'components/Elements/Shared/PurchaseIcon';
import React from 'react';
import { UnifiedCard } from 'types/unifiedTypes';
import { getPriceLabel } from 'utils/cardStats';

interface Props {
  card: UnifiedCard;
  direction?: 'column' | 'row';
}

export const PriceLabel = ({ card, direction = 'row' }: Props) => {
  const {
    priceUsd,
    priceEur,
    minPriceUsd,
    minPriceEur,
    sumPriceUsd,
    sumPriceEur,
    totalAmount,
    name,
  } = card;
  const usedPriceUsd = priceUsd ?? minPriceUsd;
  const usedPriceEur = priceEur ?? minPriceEur;
  const getFullPriceLabel = (
    minPrice: number,
    sumPrice: number,
    currency: string,
    serviceName: string
  ) => {
    if (!minPrice) {
      return `No price data found on ${serviceName}`;
    }
    const displaySum = minPrice !== sumPrice && totalAmount > 1;

    return (
      <>
        <p>Prices from {serviceName}:</p>
        {minPrice && <div>Average: {getPriceLabel(minPrice, { currency })} </div>}
        {displaySum && (
          <div>
            Sum of all {totalAmount} copies: {getPriceLabel(sumPrice, { currency })}
          </div>
        )}
      </>
    );
  };

  return (
    <Flex justify="space-between" direction={direction}>
      <Tooltip title={getFullPriceLabel(usedPriceUsd, sumPriceUsd, 'USD', 'TCGplayer')}>
        <span>
          <PurchaseIcon
            cardName={name}
            serviceName="tcgplayer"
            label={getPriceLabel(usedPriceUsd, { currency: 'USD' })}
          />
        </span>
      </Tooltip>
      <Tooltip title={getFullPriceLabel(usedPriceEur, sumPriceEur, 'EUR', 'Cardmarket')}>
        <span>
          <PurchaseIcon
            cardName={name}
            serviceName="cardmarket"
            label={getPriceLabel(usedPriceEur, { currency: 'EUR' })}
          />
        </span>
      </Tooltip>
    </Flex>
  );
};
