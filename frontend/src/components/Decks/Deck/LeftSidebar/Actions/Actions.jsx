import React from 'react';
import styled from 'styled-components';
import DeleteDeck from './DeleteDeck';

const StyledActions = styled.div`
  display: flex;
`;

export default () => {
  return (
    <StyledActions>
      <DeleteDeck />
    </StyledActions>
  );
};
