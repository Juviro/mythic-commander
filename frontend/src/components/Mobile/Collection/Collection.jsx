import React from 'react';
import styled from 'styled-components';

import { LayoutAndSortPicker } from '../../Elements/Shared';
import AddToCollection from './AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  return (
    <StyledWrapper>
      <CollectionOverview />
      <LayoutAndSortPicker showCollectionFilters />
      <Cards />
      <AddToCollection />
    </StyledWrapper>
  );
};
