import React from 'react';
import styled, { css } from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0;
  transition: margin 0.3s;
  will-change: margin-top;

  ${({ isExpanded }) =>
    !isExpanded
      ? css`
          margin-top: -100%;
        `
      : ''}
`;

export default ({ isExpanded, children }) => {
  return (
    <StyledWrapper>
      <StyledContent isExpanded={isExpanded}>{children}</StyledContent>
    </StyledWrapper>
  );
};
