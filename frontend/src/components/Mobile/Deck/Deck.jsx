import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';

import NotFound from 'components/Elements/Shared/NotFound';
import useDocumentTitle from 'components/Hooks/useDocumentTitle';
import DeckHeader from './DeckHeader';
import DeckMenu from './DeckMenu';
import DeckBody from './DeckBody';
import { getDeck, addCardsToDeck } from './queries';
import { AddCardMobile } from '../../Elements/Mobile';
import message from '../../../utils/message';
import unifyCardFormat from '../../../utils/unifyCardFormat';

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

  if (!data && !loading) {
    return <NotFound message="This deck does not seem to exist.." />;
  }

  const deck = data?.deck;
  const cards = deck && unifyCardFormat(deck.cards);
  useDocumentTitle(deck?.name);

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

  return (
    <StyledDeck>
      <DeckHeader deck={unifiedDeck} loading={loading} />
      {deck?.canEdit && <DeckMenu currentTab={currentTab} onSetTab={setCurrentTab} />}
      <DeckBody loading={loading} deck={unifiedDeck} currentTab={currentTab} />
      <AddCardMobile
        onAddCard={onAddCard}
        containedCards={cards}
        visible={currentTab === 'cards'}
      />
    </StyledDeck>
  );
};
