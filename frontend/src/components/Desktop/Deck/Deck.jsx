import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { getDeckDesktop, addCardsToDeckDesktop } from './queries';
import Cards from './Cards';
import { Flex } from '../../Elements/Shared';
import Header from './Header/Header';

const StyledDeck = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export default () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('cards');
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
      <Flex style={{ overflow: 'auto', width: '100%' }} direction="column">
        <Header deck={unifiedDeck} />
        <Cards deck={unifiedDeck} loading={loading} />
      </Flex>
      {/* <div
        style={{ backgroundColor: 'aliceblue', width: 300, height: '100%' }}
      /> */}
    </StyledDeck>
  );
};
