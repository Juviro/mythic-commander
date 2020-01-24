import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';

import DeleteDeck from './DeleteDeck';
import DuplicateDeck from './DuplicateDeck';
import ChangeCommander from './ChangeCommander';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({ deck }) => {
  return (
    <StyledWrapper>
      <List style={{ width: '100%' }}>
        <ChangeCommander deck={deck} />
        <DuplicateDeck />
        <DeleteDeck />
      </List>
    </StyledWrapper>
  );
};
//   <div>Duplicate Deck</div>
//   <div>Change Commander (dropdown with all legendary creatures)</div>
//   <div>Delete Deck</div>
