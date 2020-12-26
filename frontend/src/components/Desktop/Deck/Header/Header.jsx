import React from 'react';

import Title from './Title';
import DeckImage from './DeckImage';
import DeckActions from './DeckActions';
import { Flex, DeckStats } from '../../../Elements/Shared';
import NotLegalWarning from '../../../Mobile/Deck/DeckHeader/DeckOverview/NotLegalWarning';
import { AddCards, PageCard } from '../../../Elements/Desktop';

export default ({
  loading,
  deck,
  onAddCards,
  displayOwnedOnly,
  toggleDisplayOwnedOnly,
}) => {
  return (
    <PageCard
      loading={loading}
      title={deck && <Title deck={deck} />}
      extra={deck && <DeckActions deck={deck} />}
    >
      {deck && (
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
            <NotLegalWarning deck={deck} size={26} />
            <AddCards
              onAddCards={onAddCards}
              autoFocus={false}
              placeholder="Add a card..."
              focusId="deck.cards"
              containedCardNames={deck.cards.map(({ name }) => name)}
            />
          </Flex>
        </Flex>
      )}
    </PageCard>
  );
};
