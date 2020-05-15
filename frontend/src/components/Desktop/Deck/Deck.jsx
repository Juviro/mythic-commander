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
import useLocalStorage from '../../Hooks/useLocalStorage';

const StyledDeck = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(null);
  const { data, loading } = useQuery(getDeckDesktop, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  const [mutate] = useMutation(addCardsToDeckDesktop);

  const deck = data && data.deck;
  const cards = deck && unifyCardFormat(deck.cards);

  const unifiedDeck = deck && {
    ...deck,
    originalCards: deck.cards,
    cards,
  };

  const onAddCard = (card, name) => {
    message(`Added <b>${name}</b> to your deck!`);
    mutate({
      variables: { cards: [card], deckId: id },
    });
  };

  return (
    <StyledDeck>
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <Flex style={{ overflow: 'auto', flex: 1 }} direction="column">
        <ShortcutFocus focusId="deck.cards">
          <Header deck={unifiedDeck} />
          <Cards deck={unifiedDeck} loading={loading} currentTab={currentTab} />
        </ShortcutFocus>
      </Flex>
    </StyledDeck>
  );
};
