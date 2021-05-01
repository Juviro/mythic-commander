import { FadeIn } from 'components/Elements/Shared';
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

export const LazyRender = ({ visible, children }: Props) => {
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
