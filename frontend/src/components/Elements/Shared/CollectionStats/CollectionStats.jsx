import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

import Statistic from './Statistic';
import CollectionCharts from '../CollectionCharts';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ snapshot = {}, cards, small, loading, showCharts }) => {
  const numberOfUniqueCards = cards ? cards.length : 0;
  const numberOfCards = (cards || []).reduce(
    (sum, { totalAmount }) => sum + totalAmount,
    0
  );
  const collectionValue = (cards || []).reduce(
    (sum, { sumPrice }) => sum + sumPrice,
    0
  );

  const currentSnapshot = {
    dateLabel: 'Now',
    value: Math.ceil(collectionValue),
    amount: numberOfCards,
    amountUnique: numberOfUniqueCards,
  };

  return (
    <StyledWrapper>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Statistic
            small={small}
            title="Total Cards"
            value={numberOfCards}
            referenceValue={snapshot.amount}
          />
          <Statistic
            small={small}
            title="Unique Cards"
            value={numberOfUniqueCards}
            referenceValue={snapshot.amountUnique}
          />
          <Statistic
            small={small}
            title="Total value"
            value={collectionValue}
            suffix="$"
            referenceValue={snapshot.value}
          />
        </>
      )}

      {showCharts && <CollectionCharts currentSnapshot={currentSnapshot} />}
    </StyledWrapper>
  );
};
