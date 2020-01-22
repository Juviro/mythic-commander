import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  display: flex;
  margin-left: 8px;
  flex-direction: row;
`;

const StyledDeckImage = styled.img`
  width: 41px;
  height: 30px;
`;

const StyledDeckName = styled.div`
  margin-left: 8px;
`;

export default ({ deck }) => {
  return (
    <StyledHeader>
      <StyledDeckImage src={deck.imgSrc} />
      <StyledDeckName>{deck.name}</StyledDeckName>
    </StyledHeader>
  );
};
