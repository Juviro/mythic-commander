import React from 'react';
import styled from 'styled-components';

import { LayoutAndSortPicker } from '../../Elements/Shared';
import AddToCollection from './AddToCollection';
import Cards from './Cards';
import CollectionOverview from './CollectionOverview';

const StyledBody = styled.div`
  padding: 8px;
`;

export default () => {
  return (
    <>
      <CollectionOverview />
      <StyledBody>
        <LayoutAndSortPicker showCollectionFilters />
        <Cards />
        <AddToCollection />
      </StyledBody>
    </>
  );
};
