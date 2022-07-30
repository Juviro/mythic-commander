import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const ANIMATION_DURATION_MS = 300;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  will-change: margin-top;
  margin-top: 0;
  transition: margin-top ${({ isActive }) => (isActive ? ANIMATION_DURATION_MS : 0)}ms;

  ${({ isExpanded }) =>
    !isExpanded
      ? css`
          margin-top: ${({ offset }) => -offset}px;
        `
      : css``}
`;

export default ({ isExpanded, children, destroyOnClose = false }) => {
  const [isActive, toggleIsActive] = useState(isExpanded);
  const shouldRender = isActive || !destroyOnClose;

  const wrapperRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isExpanded) {
      toggleIsActive(true);
    } else {
      setTimeout(() => toggleIsActive(false), ANIMATION_DURATION_MS);
    }
    // eslint-disable-next-line
  }, [isExpanded, destroyOnClose]);

  // eslint-disable-next-line
  useEffect(() => {
    if (!wrapperRef.current || !wrapperRef.current.offsetHeight) return;
    setHeight(wrapperRef.current.offsetHeight);
  });

  return (
    <StyledWrapper>
      <StyledContent
        isExpanded={isExpanded}
        offset={height}
        ref={wrapperRef}
        isActive={isExpanded || isActive}
      >
        {shouldRender && children}
      </StyledContent>
    </StyledWrapper>
  );
};
