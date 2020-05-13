import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 200px;
  height: 140px;
  background-color: grey;
  border-radius: 4px;
`;

export default ({ deck }) => {
  return <StyledImage src={deck.imgSrc} />;
};
