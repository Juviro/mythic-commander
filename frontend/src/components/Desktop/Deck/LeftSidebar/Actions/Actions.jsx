import React from 'react';
import styled from 'styled-components';

import DeleteDeck from './DeleteDeck';
import DuplicateDeck from './DuplicateDeck';

const StyledActions = styled.div`
  display: flex;
  flex-direction: column;
`;

export default () => {
  return (
    <StyledActions>
      <DuplicateDeck />
      <DeleteDeck />
    </StyledActions>
  );
};
