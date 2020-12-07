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

const StyledContent = styled.div`
  max-width: 1250px;
  width: 100%;
  box-shadow: 0px 0px 12px 0px #6f6f6f;
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

interface Props {
  children: React.ReactNode;
}

export default ({ children }: Props) => {
  return (
    <StyledBackground>
      <StyledContent>{children}</StyledContent>
    </StyledBackground>
  );
};
