import React from 'react';
import { useMutation } from 'react-apollo';

import { Flex } from '../../../../Elements/Shared';
import CardList from './CardList';
import useCardListShortcuts from './useCardListShortcuts';
import { useToggle, useShortcut } from '../../../../Hooks';
import CardModalDesktop from '../../../../Elements/Desktop/CardModalDesktop';
import { deleteFromDeckDesktop } from '../../queries';
import keyCodes from '../../../../../constants/keyCodes';

const getColumnKey = column => column.map(({ type }) => type).join('');

export default ({ columns, deck }) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const {
    selectedCardId,
    setSelectedCardId,
    selectNextCard,
  } = useCardListShortcuts(columns);
  const [mutateDelete] = useMutation(deleteFromDeckDesktop);

  const onDeleteCard = () => {
    console.log('selectedCardId :', selectedCardId);
    if (!selectedCardId) return;
    selectNextCard();
    const newCards = deck.originalCards.filter(
      card => card.id !== selectedCardId
    );
    const newNumberOfCards = deck.numberOfCards;
    mutateDelete({
      variables: { cardId: selectedCardId, deckId: deck.id },
      optimisticResponse: () => ({
        __typename: 'Mutation',
        deleteFromWantsList: {
          ...deck,
          cards: newCards,
          numberOfCards: newNumberOfCards,
        },
      }),
    });
  };
  useShortcut('ENTER', selectedCardId ? toggleShowDetail : null);
  useShortcut('DEL', onDeleteCard);

  const selectedCard = columns
    .flat()
    .map(({ cards }) => cards)
    .flat()
    .find(({ id }) => id === selectedCardId);

  return (
    <>
      {columns.map(column => (
        <Flex direction="column" key={getColumnKey(column)}>
          {column.map(({ type, cards: cardGroup }) => (
            <CardList
              type={type}
              key={type}
              cards={cardGroup}
              setSelectedCardId={setSelectedCardId}
              onOpenDetails={toggleShowDetail}
              selectedCardId={selectedCardId}
            />
          ))}
        </Flex>
      ))}
      <CardModalDesktop
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};
