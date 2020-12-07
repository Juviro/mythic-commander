import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  font-size: 24px;
  font-weight: 400;
`;

export default () => {
  return (
    <StyledWrapper>
      <StyledTitle>Search for cards</StyledTitle>
    </StyledWrapper>
  );
};
