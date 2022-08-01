import React from 'react';
import { Skeleton, Divider } from 'antd';
import { useQuery } from '@apollo/client';

import styled from 'styled-components';
import Flex from 'components/Elements/Shared/Flex';
import CollectionStatHint from 'components/Elements/Shared/CollectionStats/CollectionStatHint';
import Statistic from './Statistic';
import CollectionCharts from '../CollectionCharts';
import { currentSnapshots as getCurrentSnapshot } from './queries';

const StyledCollectionStats = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
`;

export default ({ horizontal, showCharts }) => {
  const { data, loading } = useQuery(getCurrentSnapshot);

  const currentSnapshot = data?.collection.currentSnapshot ?? {};
  const referenceSnapshot = data?.collection.referenceSnapshot ?? {};

  const percentageMissingEur = Math.ceil(
    (currentSnapshot.missingPriceEur / currentSnapshot.amountUniqueVersions) * 100
  );

  return (
    <Flex direction="column">
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Divider orientation={horizontal ? 'left' : 'center'}>Collected Cards</Divider>
          <StyledCollectionStats>
            <Statistic
              horizontal={horizontal}
              title="Total Cards"
              value={currentSnapshot.amount ?? 0}
              referenceValue={referenceSnapshot.amount}
            />
            <Statistic
              horizontal={horizontal}
              title="Unique Card Versions"
              value={currentSnapshot.amountUniqueVersions ?? 0}
              referenceValue={referenceSnapshot.amountUniqueVersions}
            />
            <Statistic
              horizontal={horizontal}
              title="Unique Cards"
              value={currentSnapshot.amountUnique ?? 0}
              referenceValue={referenceSnapshot.amountUnique}
            />
          </StyledCollectionStats>
          <Divider orientation={horizontal ? 'left' : 'center'}>Collection Value</Divider>
          <StyledCollectionStats>
            <Statistic
              horizontal={horizontal}
              title="Total Value (USD)"
              value={currentSnapshot.value ?? 0}
              prefix="$"
              referenceValue={referenceSnapshot.value}
            />
            <Statistic
              horizontal={horizontal}
              title={
                <CollectionStatHint
                  // eslint-disable-next-line max-len
                  hint={`No price found for ${currentSnapshot.missingPriceEur} of ${currentSnapshot.amountUniqueVersions} cards (${percentageMissingEur}%).`}
                  title="Total Value (EUR)"
                />
              }
              value={currentSnapshot.valueEur ?? 0}
              prefix="€"
              referenceValue={referenceSnapshot.valueEur}
            />
          </StyledCollectionStats>
        </>
      )}
      {showCharts && (
        <CollectionCharts currentSnapshot={{ ...currentSnapshot, dateLabel: 'Now' }} />
      )}
    </Flex>
  );
};
