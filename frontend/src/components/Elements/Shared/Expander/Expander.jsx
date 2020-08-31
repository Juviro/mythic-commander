import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { setTimeout } from 'timers';

const ANIMATION_DURATION_MS = 300;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  transition: max-height ${ANIMATION_DURATION_MS}ms;
  will-change: max-height;
  max-height: auto;

  ${({ isExpanded }) =>
    !isExpanded
      ? css`
          max-height: 0;
        `
      : ''}
`;

export default ({ isExpanded, children, destroyOnClose = false }) => {
  const [shouldRender, toggleShouldRender] = useState(isExpanded || !destroyOnClose);

  useEffect(() => {
    if (!destroyOnClose) return;
    if (isExpanded) {
      toggleShouldRender(true);
    } else {
      setTimeout(() => toggleShouldRender(false), ANIMATION_DURATION_MS);
    }
  }, [isExpanded]);

  return (
    <StyledWrapper>
      <StyledContent isExpanded={isExpanded}>{shouldRender && children}</StyledContent>
    </StyledWrapper>
  );
};
