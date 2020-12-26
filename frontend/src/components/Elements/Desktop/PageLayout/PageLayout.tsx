import { lightBackground } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  height: 100%;
  display: flex;
  overflow: auto;
  justify-content: center;
  background-color: ${lightBackground};
`;

const StyledContent = styled.div<{ fullWidth: boolean }>`
  width: 100%;
  box-shadow: 0px 0px 12px 0px #6f6f6f;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1250px')};
`;

interface Props {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default ({ children, fullWidth }: Props) => {
  return (
    <StyledBackground>
      <StyledContent fullWidth={fullWidth}>{children}</StyledContent>
    </StyledBackground>
  );
};
