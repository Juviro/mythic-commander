import FadeIn from 'components/Elements/Shared/FadeIn';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

const StyledHideWrapper = styled.div<{ visible: boolean }>`
  ${({ visible }) =>
    !visible &&
    css`
      display: none;
    `}
  height: 100%;
  overflow: auto;
`;

interface Props {
  visible: boolean;
  children: React.ReactNode;
}

const LazyRenderComponent = ({ visible, children }: Props) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (!visible || shouldRender) return;
    setShouldRender(true);
  }, [shouldRender, setShouldRender, visible]);

  if (!shouldRender) return null;

  return (
    <StyledHideWrapper visible={visible}>
      <FadeIn>{children}</FadeIn>
    </StyledHideWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  // If this is already not visible, we do not need to re-render it
  return !prevProps.visible && !nextProps.visible;
};

export const LazyRender = React.memo(LazyRenderComponent, areEqual);
