import React from 'react';
import styled, { css } from 'styled-components';

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  ${({ isInactive }) =>
    isInactive
      ? css`
          filter: grayscale(1);
          pointer-events: none;
        `
      : ''}
`;

export default ({ children, isInactive }) => {
  return <StyledOverlay isInactive={isInactive}>{children}</StyledOverlay>;
};
