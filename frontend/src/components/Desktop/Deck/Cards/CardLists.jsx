import React from 'react';
import { useMutation } from 'react-apollo';

import { Flex, ConfirmDelete } from '../../../Elements/Shared';
import CardList from './CardList';
import useCardListShortcuts from './useCardListShortcuts';
import { useToggle, useShortcut } from '../../../Hooks';
import CardModalDesktop from '../../../Elements/Desktop/CardModalDesktop';
import { deleteFromDeckDesktop } from '../queries';
import boldText from '../../../../utils/boldText';

const getColumnKey = column => column.map(({ type }) => type).join('');

export default ({ columns, deck }) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const {
    selectedCardOracleId,
    setSelectedCardOracleId,
    selectNextCard,
  } = useCardListShortcuts(columns);
  const [isDeleting, setIsDeleting] = useToggle();
  const [mutateDelete] = useMutation(deleteFromDeckDesktop);

  const selectedCard = columns
    .flat()
    .map(({ cards }) => cards)
    .flat()
    .find(({ oracle_id }) => oracle_id === selectedCardOracleId);

  const onDeleteCard = () => {
    if (!selectedCard) return;
    selectNextCard();
    setIsDeleting(false);
    const newCards = deck.originalCards.filter(
      card => card.id !== selectedCard.id
    );
    const newNumberOfCards = deck.numberOfCards;
    mutateDelete({
      variables: { cardId: selectedCard.id, deckId: deck.id },
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
  const onOpenDeleteModal = () => {
    if (!selectedCard) return;
    setIsDeleting(true);
  };

  useShortcut('DEL', onOpenDeleteModal, 'deck.cards');
  useShortcut('SPACE', selectedCard ? toggleShowDetail : null, 'deck.cards');
  useShortcut('ESC', () => setSelectedCardOracleId(null), 'deck.cards');

  return (
    <>
      {columns.map(column => (
        <Flex direction="column" key={getColumnKey(column)}>
          {column.map(({ type, cards: cardGroup }) => (
            <CardList
              type={type}
              key={type}
              cards={cardGroup}
              onDelete={onOpenDeleteModal}
              setSelectedCardOracleId={setSelectedCardOracleId}
              onOpenDetails={toggleShowDetail}
              selectedCardId={selectedCard && selectedCard.id}
            />
          ))}
        </Flex>
      ))}
      <CardModalDesktop
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
      {isDeleting && (
        <ConfirmDelete
          text={boldText(`Delete <b>${selectedCard.name}</b> from this deck?`)}
          onCancel={() => setIsDeleting(false)}
          onOk={onDeleteCard}
        />
      )}
    </>
  );
};
