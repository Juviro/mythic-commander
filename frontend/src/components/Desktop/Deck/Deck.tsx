import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import { MutationAddCardsToDeckArgs, CardInputType, Query } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { PageLayout } from 'components/Elements/Desktop';
import Cards from './Cards';
import Sidebar from './Sidebar';
import Header from './Header/Header';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import { Flex, ShortcutFocus } from '../../Elements/Shared';
import sumCardAmount from '../../../utils/sumCardAmount';
import { useToggle } from '../../Hooks';

const StyledDeck = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState(null);
  const [displayOwnedOnly, toggleDisplayOwnedOnly] = useToggle();
  const { data, loading } = useQuery<Query>(getDeckDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [mutate] = useMutation<any, MutationAddCardsToDeckArgs>(addCardsToDeckDesktop);

  const deck = data?.deck;
  const cards = unifyCardFormat(deck?.cards);

  const unifiedDeck: UnifiedDeck = deck && {
    ...deck,
    originalCards: deck.cards,
    cards,
  };

  const onAddCards = (newCards: CardInputType[], name: string) => {
    const addedLabel = name || `${sumCardAmount(newCards)} cards`;
    message(`Added <b>${addedLabel}</b> to your deck!`);
    mutate({
      variables: { cards: newCards, deckId: id },
    });
  };

  return (
    <ShortcutFocus focusId="deck.cards" style={{ overflow: 'auto', flex: 1 }}>
      <PageLayout fullWidth>
        <Header
          deck={unifiedDeck}
          loading={loading}
          onAddCards={onAddCards}
          displayOwnedOnly={displayOwnedOnly}
          toggleDisplayOwnedOnly={toggleDisplayOwnedOnly}
        />
        <Cards
          deck={unifiedDeck}
          loading={loading}
          currentTab={currentTab}
          onAddCards={onAddCards}
          displayOwnedOnly={displayOwnedOnly}
        />
      </PageLayout>
    </ShortcutFocus>
  );
};
