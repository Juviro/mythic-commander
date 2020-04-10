import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

import Statistic from './Statistic';
import { getPriceLabel } from '../../../../utils/cardStats';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ snapshot = {}, cards, small, loading }) => {
  const numberOfUniqueCards = cards ? cards.length : 0;
  const numberOfCards = (cards || []).reduce(
    (sum, { totalAmount }) => sum + totalAmount,
    0
  );
  const collectionValue = (cards || []).reduce(
    (sum, { sumPrice }) => sum + sumPrice,
    0
  );

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
            displayedValue={getPriceLabel(collectionValue, { round: true })}
            referenceValue={snapshot.value}
          />
        </>
      )}
    </StyledWrapper>
  );
};
