import React from 'react';
import { useMutation } from 'react-apollo';

import { Flex, ConfirmDelete } from '../../../Elements/Shared';
import SubList from './SubList';
import useCardListShortcuts from './useCardListShortcuts';
import { useToggle, useShortcut } from '../../../Hooks';
import CardModalDesktop from '../../../Elements/Desktop/CardModalDesktop';
import { deleteFromDeckDesktop } from '../queries';
import boldText from '../../../../utils/boldText';

const getColumnKey = (column) => column.map(({ type }) => type).join('');

export default ({ cardsByType, deck, displayOwnedOnly }) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  // const {
  //   selectedCardOracleId,
  //   setSelectedCardOracleId,
  //   selectNextCard,
  // } = useCardListShortcuts(columns);
  const [isDeleting, setIsDeleting] = useToggle();
  const [mutateDelete] = useMutation(deleteFromDeckDesktop);

  // const selectedCard = columns
  //   .flat()
  //   .map(({ cards }) => cards)
  //   .flat()
  //   .find(({ oracle_id }) => oracle_id === selectedCardOracleId);

  const onDeleteCard = (cardId) => {
    // if (!cardId) return;
    // setIsDeleting(false);
    // if (cardId === selectedCard?.id) {
    //   selectNextCard(null);
    // }
    // const newCards = deck.originalCards.filter((card) => card.id !== cardId);
    // const newNumberOfCards = deck.numberOfCards;
    // mutateDelete({
    //   variables: { cardId, deckId: deck.id },
    //   optimisticResponse: () => ({
    //     __typename: 'Mutation',
    //     deleteFromWantsList: {
    //       ...deck,
    //       cards: newCards,
    //       numberOfCards: newNumberOfCards,
    //     },
    //   }),
    // });
  };
  const onOpenDeleteModal = () => {
    // if (!selectedCard) return;
    // setIsDeleting(true);
  };

  // useShortcut('BACKSPACE', onOpenDeleteModal, 'deck.cards');
  // useShortcut('SPACE', selectedCard ? toggleShowDetail : null, 'deck.cards');
  // useShortcut('ESC', () => setSelectedCardOracleId(null), 'deck.cards');

  const onOpenDetails = (cardId) => {
    // setSelectedCardOracleId(cardId);
    // toggleShowDetail();
  };

  return (
    <>
      {cardsByType.map(({ type, cards }) => (
        <SubList
          type={type}
          key={type}
          cards={cards}
          displayOwnedOnly={displayOwnedOnly}
          // onDelete={onOpenDeleteModal}
          // onDeleteImmediately={onDeleteCard}
          // setSelectedCardOracleId={setSelectedCardOracleId}
          // onOpenDetails={onOpenDetails}
          // selectedCardId={selectedCard && selectedCard.id}
        />
      ))}
      {/* <CardModalDesktop
        selectedCard={selectedCard}
        visible={selectedCard && showDetails}
        onClose={toggleShowDetail}
      /> */}
      {/* {isDeleting && (
        <ConfirmDelete
          text={boldText(`Delete <b>${selectedCard.name}</b> from this deck?`)}
          onCancel={() => setIsDeleting(false)}
          onOk={() => onDeleteCard(selectedCard.id)}
        />
      )} */}
    </>
  );
};
