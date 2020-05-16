import React from 'react';
import { Skeleton } from 'antd';
import styled from 'styled-components';

import Title from './Title';
import DeckImage from './DeckImage';
import DeckActions from './DeckActions';
import { Flex, DeckStats } from '../../../Elements/Shared';
import NotLegalWarning from '../../../Mobile/Deck/DeckHeader/DeckOverview/NotLegalWarning';
import { AddCards } from '../../../Elements/Desktop';

const StyledWrapper = styled(Flex)`
  height: 226px;
  width: 100%;
  padding: 16px;
`;

export default ({ deck, onAddCards }) => {
  if (!deck) {
    return (
      <StyledWrapper>
        <Skeleton />
      </StyledWrapper>
    );
  }
  return (
    <StyledWrapper direction="column">
      <Flex direction="row" justify="space-between" align="center">
        <Title deck={deck} />
        <NotLegalWarning deck={deck} size={26} />
      </Flex>
      <Flex direction="row" justify="space-between">
        <Flex direction="row">
          <DeckImage deck={deck} />
          <DeckStats deck={deck} />
        </Flex>
        <Flex direction="column" justify="space-between" align="flex-end">
          <DeckActions deck={deck} />
          <AddCards
            style={{ width: 250 }}
            onAddCards={onAddCards}
            autoFocus={false}
            placeholder="Add a card..."
            focusId="deck.cards"
          />
        </Flex>
      </Flex>
    </StyledWrapper>
  );
};
