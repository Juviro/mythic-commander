import { fadeIn } from 'components/Animations';
import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLabel = styled.p`
  font-size: 1.8em;
  animation: ${fadeIn} 3s ease-out;
`;

export const LoadingScreen = () => {
  return (
    <StyledWrapper>
      <StyledLabel>Loading your game...</StyledLabel>
    </StyledWrapper>
  );
};
