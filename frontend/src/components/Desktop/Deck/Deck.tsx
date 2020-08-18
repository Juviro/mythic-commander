import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import Cards from './Cards';
import Sidebar from './Sidebar';
import Header from './Header/Header';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import { Flex, ShortcutFocus } from '../../Elements/Shared';
import sumCardAmount from '../../../utils/sumCardAmount';
import { useToggle } from '../../Hooks';
import { Deck } from 'types/graphql';

const StyledDeck = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(null);
  const [displayOwnedOnly, toggleDisplayOwnedOnly] = useToggle();
  const { data, loading } = useQuery(getDeckDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [mutate] = useMutation(addCardsToDeckDesktop);

  const deck: Deck = data && data.deck;
  const cards = deck && unifyCardFormat(deck.cards);

  const unifiedDeck = deck && {
    ...deck,
    originalCards: deck.cards,
    cards,
  };

  const onAddCards = (newCards, name) => {
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
