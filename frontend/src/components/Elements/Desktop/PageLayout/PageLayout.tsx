import { pageBackground } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 100%;
  background-color: ${pageBackground};
`;

const StyledContent = styled.div`
  max-width: 1500px;
  width: 100%;
  box-shadow: 0px 0px 12px 0px #6f6f6f;
  background-color: white;
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
