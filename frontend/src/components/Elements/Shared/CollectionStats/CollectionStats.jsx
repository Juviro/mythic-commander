import React from 'react';
import { Skeleton } from 'antd';
import { useQuery } from '@apollo/react-hooks';

import styled from 'styled-components';
import Flex from 'components/Elements/Shared/Flex';
import Statistic from './Statistic';
import CollectionCharts from '../CollectionCharts';
import { currentSnapshots as getCurrentSnapshot } from './queries';

const StyledCollectionStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 900px) {
    flex-direction: ${({ horizontal }) => (horizontal ? 'row' : 'column')};
  }
`;

export default ({ horizontal, showCharts }) => {
  const { data, loading } = useQuery(getCurrentSnapshot);

  const currentSnapshot = data?.collection.currentSnapshot ?? {};
  currentSnapshot.dateLabel = 'Now';
  const referenceSnapshot = data?.collection.referenceSnapshot ?? {};

  return (
    <Flex direction="column">
      <StyledCollectionStats horizontal={horizontal}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <Statistic
              horizontal={horizontal}
              title="Total Cards"
              value={currentSnapshot.amount ?? 0}
              referenceValue={referenceSnapshot.amount}
            />
            <Statistic
              horizontal={horizontal}
              title="Unique Cards"
              value={currentSnapshot.amountUnique ?? 0}
              referenceValue={referenceSnapshot.amountUnique}
            />
            <Statistic
              horizontal={horizontal}
              title="Total Value"
              value={currentSnapshot.value ?? 0}
              prefix="$"
              referenceValue={referenceSnapshot.value}
            />
          </>
        )}
      </StyledCollectionStats>
      {showCharts && <CollectionCharts currentSnapshot={currentSnapshot} />}
    </Flex>
  );
};
