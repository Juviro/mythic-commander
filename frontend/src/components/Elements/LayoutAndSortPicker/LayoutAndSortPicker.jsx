import React from 'react';
import styled from 'styled-components';
import LayoutPicker from '../LayoutPicker';
import SortPicker from '../SortPicker';

const StyledListOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 16px;
  width: 100%;
`;

export default ({ showCollectionFilters }) => {
  return (
    <StyledListOrder>
      <SortPicker showCollectionFilters={showCollectionFilters} />
      <LayoutPicker />
    </StyledListOrder>
  );
};
