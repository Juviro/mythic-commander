import React from 'react';
import styled from 'styled-components';
import { ResetFilter } from '../../Elements/Shared';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
`;

export default ({ onResetOptions, isFilterResettable }) => {
  return (
    <StyledWrapper>
      <StyledTitle>Search for cards</StyledTitle>
      {isFilterResettable && <ResetFilter onReset={onResetOptions} />}
    </StyledWrapper>
  );
};
