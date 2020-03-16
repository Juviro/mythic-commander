import React, { useState } from 'react';
import { Spin, message } from 'antd';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from 'react-apollo';

import DeckHeader from './DeckHeader';
import DeckMenu from './DeckMenu';
import DeckBody from './DeckBody';
import { getDeck, addCardsToDeck } from './queries';
import { AddCardMobile } from '../../Elements';

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

  const onAddCard = (card, name) => {
    message.success(
      <span>
        Added <b>{name}</b> to your deck!
      </span>
    );
    mutate({
      variables: { cards: [card], deckId: id },
    });
  };

  return (
    <StyledDeck>
      {loading && !deck ? (
        <Spin />
      ) : (
        <>
          <DeckHeader deck={deck} />
          <DeckMenu
            deck={deck}
            currentTab={currentTab}
            onSetTab={setCurrentTab}
          />
          <DeckBody deck={deck} currentTab={currentTab} />
        </>
      )}
      <AddCardMobile onAddCard={onAddCard} />
    </StyledDeck>
  );
};
