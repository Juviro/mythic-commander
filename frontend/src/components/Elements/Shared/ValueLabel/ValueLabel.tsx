import React from 'react';
import { UnifiedList } from 'types/unifiedTypes';
import { getListStats } from 'utils/getListStats';
import Flex from '../Flex';
import PurchaseIcon from '../PurchaseIcon';

interface Props {
  list: UnifiedList;
  displayUnowned?: boolean;
}

export const ValueLabel = ({ list, displayUnowned }: Props) => {
  const {
    ownedValueLabelUsd,
    ownedValueLabelEur,
    numberOfNoEurPrice,
    numberOfNoUsdPrice,
    valueLabelUsd,
    valueLabelEur,
  } = getListStats(list);

  return (
    <Flex wrap="wrap">
      <PurchaseIcon
        asLink={false}
        serviceName="tcgplayer"
        label={displayUnowned ? valueLabelUsd : ownedValueLabelUsd}
        style={{ marginRight: 16 }}
        numberOfNotIncludedCards={numberOfNoUsdPrice}
      />
      <PurchaseIcon
        asLink={false}
        serviceName="cardmarket"
        label={displayUnowned ? valueLabelEur : ownedValueLabelEur}
        numberOfNotIncludedCards={numberOfNoEurPrice}
      />
    </Flex>
  );
};
