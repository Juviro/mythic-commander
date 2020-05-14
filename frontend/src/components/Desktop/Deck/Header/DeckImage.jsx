import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 200px;
  height: 140px;
  background-color: #cecece;
  border-radius: 4px;
  overflow: hidden;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default ({ deck }) => {
  return (
    <StyledWrapper>
      <StyledImage src={deck.imgSrc} />
    </StyledWrapper>
  );
};
