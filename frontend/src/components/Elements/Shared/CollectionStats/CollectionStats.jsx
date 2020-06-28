import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

import Statistic from './Statistic';
import CollectionCharts from '../CollectionCharts';
import { currentSnapshots as getCurrentSnapshot } from './queries';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ({ small, showCharts }) => {
  const { data, loading } = useQuery(getCurrentSnapshot);

  const currentSnapshot = data ? data.collection.currentSnapshot : {};
  currentSnapshot.dateLabel = 'Now';
  const referenceSnapshot = data ? data.collection.referenceSnapshot : {};

  return (
    <StyledWrapper>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Statistic
            small={small}
            title="Total Cards"
            value={currentSnapshot.amount}
            referenceValue={referenceSnapshot.amount}
          />
          <Statistic
            small={small}
            title="Unique Cards"
            value={currentSnapshot.amountUnique}
            referenceValue={referenceSnapshot.amountUnique}
          />
          <Statistic
            small={small}
            title="Total value"
            value={currentSnapshot.value}
            suffix="$"
            referenceValue={referenceSnapshot.value}
          />
          {showCharts && <CollectionCharts currentSnapshot={currentSnapshot} />}
        </>
      )}
    </StyledWrapper>
  );
};
