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

export default ({ deck, onAddCards, displayOwnedOnly, toggleDisplayOwnedOnly }) => {
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
          <DeckStats
            deck={deck}
            displayOwnedOnly={displayOwnedOnly}
            toggleDisplayOwnedOnly={toggleDisplayOwnedOnly}
          />
        </Flex>
        <Flex direction="column" justify="space-between" align="flex-end">
          <DeckActions deck={deck} />
          <AddCards
            onAddCards={onAddCards}
            autoFocus={false}
            placeholder="Add a card..."
            focusId="deck.cards"
            containedCardNames={deck.cards.map(({ name }) => name)}
          />
        </Flex>
      </Flex>
    </StyledWrapper>
  );
};
