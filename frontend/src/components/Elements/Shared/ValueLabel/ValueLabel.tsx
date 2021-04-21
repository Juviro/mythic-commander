import React from 'react';
import { UnifiedList } from 'types/unifiedTypes';
import { getListStats } from 'utils/getListStats';
import Flex from '../Flex';
import PurchaseIcon from '../PurchaseIcon';

interface Props {
  list: UnifiedList;
}

export const ValueLabel = ({ list }: Props) => {
  const {
    ownedValueLabelUsd,
    ownedValueLabelEur,
    numberOfNoEurPrice,
    numberOfNoUsdPrice,
  } = getListStats(list);

  return (
    <Flex wrap="wrap">
      <PurchaseIcon
        asLink={false}
        serviceName="tcgplayer"
        label={ownedValueLabelUsd}
        style={{ marginRight: 16 }}
        numberOfNotIncludedCards={numberOfNoUsdPrice}
      />
      <PurchaseIcon
        asLink={false}
        serviceName="cardmarket"
        label={ownedValueLabelEur}
        numberOfNotIncludedCards={numberOfNoEurPrice}
      />
    </Flex>
  );
};
