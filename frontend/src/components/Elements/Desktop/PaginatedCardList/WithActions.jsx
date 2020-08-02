import React, { useEffect, useState } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { useToggle } from '../../../Hooks';
import sumCardAmount from '../../../../utils/sumCardAmount';
import { ConfirmDeleteCards, AddCardsTo, EditCardModal } from '../../Shared';

export default ({ onEditCard, deleteByOracle, children, ...props }) => {
  const [{ page, layout }] = useQueryParams({
    page: NumberParam,
    layout: StringParam,
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedSingleCard, setSelectedSingleCard] = useState(null);
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
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
    toggleShowMoveModal(false);
    toggleShowEditModal(false);
  };

  const onOpenEditCard = card => {
    setSelectedSingleCard(card);
    toggleShowEditModal(true);
  };

  return (
    <>
      {children({
        search,
        setSearch,
        selectedCards,
        setSelectedCards,
        onMoveCards: toggleShowMoveModal,
        onEditCard: onEditCard ? onOpenEditCard : undefined,
        onDeleteCards: deleteByOracle ? toggleShowDeleteModal : undefined,
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
      <AddCardsTo
        cardsToAdd={selectedCards}
        onCancel={onCancel}
        onSubmit={() => {
          onCancel();
          setSelectedCards([]);
        }}
        visible={showMoveModal}
      />
      {showEditModal && (
        <EditCardModal
          onEdit={onEditCard}
          card={selectedSingleCard}
          onCancel={onCancel}
        />
      )}
    </>
  );
};
