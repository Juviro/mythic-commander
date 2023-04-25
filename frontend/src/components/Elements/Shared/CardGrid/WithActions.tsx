import React, { useEffect, useState } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { useToggle } from '../../../Hooks';
import sumCardAmount from '../../../../utils/sumCardAmount';
import AddCardsTo from '../AddCardsTo';
import ConfirmDeleteCards from '../ConfirmDeleteCards';
import EditCardModal from '../EditCardModal';

const WithActions = ({
  onEditCard = null,
  deleteByOracle = null,
  children,
  ...props
}) => {
  const [{ page, layout }] = useQueryParams({
    page: NumberParam,
    layout: StringParam,
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedSingleCard, setSelectedSingleCard] = useState(null);
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
  const [showCopyModal, toggleShowCopyModal] = useToggle();
  const [showMoveModal, toggleShowMoveModal] = useToggle();
  const [showEditModal, toggleShowEditModal] = useToggle();

  const [search, setSearch] = useState('');

  const numberOfSelectedCards = sumCardAmount(selectedCards);

  const onDelete = () => {
    deleteByOracle(
      selectedCards.map(({ oracle_id }) => oracle_id),
      numberOfSelectedCards
    );
    setSelectedCards([]);
  };

  const onDeleteCards = (cards) => {
    toggleShowDeleteModal(true);
    setSelectedCards(cards);
  };

  useEffect(() => {
    if (selectedCards.length) return;
    toggleShowDeleteModal(false);
    // eslint-disable-next-line
  }, [selectedCards.length]);

  useEffect(() => {
    setSelectedCards([]);
    // eslint-disable-next-line
  }, [page, layout]);

  const onCancel = () => {
    toggleShowDeleteModal(false);
    toggleShowEditModal(false);
    toggleShowCopyModal(false);
    toggleShowMoveModal(false);
  };

  const onOpenEditCard = (card) => {
    setSelectedSingleCard(card);
    toggleShowEditModal(true);
  };

  const onMoveCards = (cards) => {
    setSelectedCards(cards);
    toggleShowMoveModal(true);
  };
  const onCopyCardsTo = (cards) => {
    setSelectedCards(cards);
    toggleShowCopyModal(true);
  };

  return (
    <>
      {children({
        search,
        setSearch,
        onCopyCardsTo,
        onEditCard: onEditCard ? onOpenEditCard : undefined,
        onMoveCards: deleteByOracle ? onMoveCards : undefined,
        onDeleteCards: deleteByOracle ? onDeleteCards : undefined,
        ...props,
      })}
      {showDeleteModal && (
        <ConfirmDeleteCards
          onDelete={onDelete}
          cardsToDelete={selectedCards}
          onCancel={onCancel}
          numberOfSelectedCards={numberOfSelectedCards}
        />
      )}
      {showEditModal && (
        <EditCardModal
          onEdit={onEditCard}
          card={selectedSingleCard}
          onCancel={onCancel}
        />
      )}
      <AddCardsTo
        cardsToAdd={selectedCards}
        title={showMoveModal ? 'Move cards to' : 'Copy cards to'}
        onCancel={onCancel}
        onSubmit={() => {
          if (showMoveModal) {
            onDelete();
          }
          onCancel();
          setSelectedCards([]);
        }}
        visible={showMoveModal || showCopyModal}
      />
    </>
  );
};

export default WithActions;
