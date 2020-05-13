import React from 'react';
import { List, Skeleton } from 'antd';
import styled from 'styled-components';

import DeleteDeck from './DeleteDeck';
import DuplicateDeck from './DuplicateDeck';
import ChangeImage from './ChangeImage';
import ChangeCommander from './ChangeCommander';
import { DeckTitle } from '../../../Elements/Shared';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({ deck, loading }) => {
  return (
    <StyledWrapper>
      <Skeleton active loading={loading}>
        <List style={{ width: '100%' }}>
          <List.Item>
            <DeckTitle deck={deck} />
          </List.Item>
          <ChangeCommander deck={deck} />
          <ChangeImage deck={deck} />
          <DuplicateDeck />
          <DeleteDeck />
        </List>
      </Skeleton>
    </StyledWrapper>
  );
};
