import React from 'react';
import styled from 'styled-components';

import { PageCard } from 'components/Elements/Desktop';
import CollectionStats from 'components/Elements/Shared/CollectionStats';
import { CollectionVisibility } from 'components/Elements/Shared/Visibility';
import Flex from 'components/Elements/Shared/Flex';

const StyledStats = styled.div`
  width: 50%;
  @media (min-width: 900px) {
    min-width: 700px;
  }
`;

export default () => {
  return (
    <PageCard title="Overview" extra={<CollectionVisibility />}>
      <Flex wrap="wrap">
        <StyledStats>
          <CollectionStats showCharts horizontal />
        </StyledStats>
        <Flex flex={1} direction="column" />
      </Flex>
    </PageCard>
  );
};
