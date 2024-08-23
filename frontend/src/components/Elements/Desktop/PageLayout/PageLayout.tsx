import { lightBackground } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';

export const PAGE_WIDTH_SMALL = 1250;
export const PAGE_WIDTH_LARGE = 1800;

const StyledBackground = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  overflow: auto;
  justify-content: center;
  background-color: ${lightBackground};
`;

const sizes = {
  small: '600px',
  medium: '1250px',
  large: '1800px',
} as const;

type Size = keyof typeof sizes;

const StyledContent = styled.div<{ size: Size }>`
  width: 100%;
  box-shadow: 0px 0px 12px 0px #6f6f6f;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
  position: relative;
  max-width: ${({ size }) => sizes[size]};
`;

interface Props {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
}

const PageLayout = ({ children, size = 'medium', style }: Props) => {
  return (
    <StyledBackground style={style}>
      <StyledContent size={size}>{children}</StyledContent>
    </StyledBackground>
  );
};

export default PageLayout;
