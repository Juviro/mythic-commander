import React, { useState } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import DeckHeader from './DeckHeader';
import DeckMenu from './DeckMenu';
import DeckBody from './DeckBody';
import { getDeck, addCardsToDeck } from './queries';
import { AddCardMobile } from '../../Elements';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import CardModal from '../Card/CardModal';

const StyledDeck = styled.div`
  width: 100%;
  display: flex;
  min-height: 300px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default () => {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('cards');
  const { data, loading } = useQuery(getDeck, { variables: { id } });
  const [mutate] = useMutation(addCardsToDeck);

  const deck = data && data.deck;
  const cards = deck && unifyCardFormat(deck.cards);

  const unifiedDeck = deck && {
    ...deck,
    cards,
  };

  const onAddCard = (card, name) => {
    message(`Added <b>${name}</b> to your deck!`);
    mutate({
      variables: { cards: [card], deckId: id },
    });
  };

  const basePath = `/m/decks/${id}`;

  return (
    <StyledDeck>
      <DeckHeader deck={unifiedDeck} loading={loading} />
      <DeckMenu
        loading={loading}
        deck={unifiedDeck}
        currentTab={currentTab}
        onSetTab={setCurrentTab}
      />
      <DeckBody loading={loading} deck={unifiedDeck} currentTab={currentTab} />
      <AddCardMobile onAddCard={onAddCard} containedCards={cards} />
      <CardModal basePath={basePath} />
    </StyledDeck>
  );
};
