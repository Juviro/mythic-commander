import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import {
  Deck,
  DeckCard,
  MutationAddCardsToDeckArgs,
  CardInputType,
  Query,
} from 'types/graphql';
import { UnifiedDeckCard } from 'types/unifiedTypes';
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

export interface UnifiedDeck extends Omit<Deck, 'cards'> {
  originalCards: Array<DeckCard>;
  cards: Array<UnifiedDeckCard>;
}

export default () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('wants');
  // const [currentTab, setCurrentTab] = useState(null); TODO
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
    <StyledDeck>
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onAddCards={onAddCards}
        deck={unifiedDeck}
      />
      <ShortcutFocus focusId="deck.cards" style={{ overflow: 'auto', flex: 1 }}>
        <Flex style={{ marginLeft: 50 }} direction="column">
          <Header
            deck={unifiedDeck}
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
        </Flex>
      </ShortcutFocus>
    </StyledDeck>
  );
};
