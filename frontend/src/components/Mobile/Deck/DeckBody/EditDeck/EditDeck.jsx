import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';

import ChangeName from './ChangeName';
import DeleteDeck from './DeleteDeck';
import DuplicateDeck from './DuplicateDeck';
import ChangeImage from './ChangeImage';
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
        <ChangeName deck={deck} />
        <ChangeCommander deck={deck} />
        <ChangeImage deck={deck} />
        <DuplicateDeck />
        <DeleteDeck />
      </List>
    </StyledWrapper>
  );
};
