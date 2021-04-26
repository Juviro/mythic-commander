import { fadeIn } from 'components/Animations';
import React from 'react';
import styled from 'styled-components';

const StyledFadeIn = styled.div<{ duration: number }>`
  animation: ${fadeIn} ${({ duration }) => duration}s;
`;

interface Props {
  duration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FadeIn = ({ duration = 0.5, children, style }: Props) => {
  return (
    <StyledFadeIn duration={duration} style={style}>
      {children}
    </StyledFadeIn>
  );
};
