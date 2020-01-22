import React from 'react';
import styled from 'styled-components';

const StyledInfoBox = styled.div`
  width: 100%;
  height: 200px;
`;

export default ({ deck }) => {
  return (
    <>
      <StyledInfoBox>{deck.name}</StyledInfoBox>
    </>
  );
};
