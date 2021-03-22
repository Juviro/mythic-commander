import React, { useEffect, useState } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { useToggle } from '../../../Hooks';
import sumCardAmount from '../../../../utils/sumCardAmount';
import { ConfirmDeleteCards, EditCardModal } from '..';

export default ({ onEditCard = null, deleteByOracle = null, children, ...props }) => {
  const [{ page, layout }] = useQueryParams({
    page: NumberParam,
    layout: StringParam,
  });
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedSingleCard, setSelectedSingleCard] = useState(null);
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
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

  const onDeleteCard = (card) => {
    toggleShowDeleteModal(true);
    setSelectedCards([card]);
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
  };

  const onOpenEditCard = (card) => {
    setSelectedSingleCard(card);
    toggleShowEditModal(true);
  };

  return (
    <>
      {children({
        search,
        setSearch,
        onEditCard: onEditCard ? onOpenEditCard : undefined,
        onDeleteCard: deleteByOracle ? onDeleteCard : undefined,
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
    </>
  );
};
