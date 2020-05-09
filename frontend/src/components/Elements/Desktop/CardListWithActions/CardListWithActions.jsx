import React, { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useStoredQueryParam, useToggle } from '../../../Hooks';
import { filterCards, sortCards } from '../../../../utils/cardFilter';
import PaginatedCardList from '../PaginatedCardList';
import { ConfirmDeleteCards, AddCardsTo, EditCardModal } from '../../Shared';
import sumCardAmount from '../../../../utils/sumCardAmount';

export default ({
  cards,
  loading,
  widthOffset,
  hideAddToCollection,
  deleteByOracle,
  title,
  hiddenColumns,
  onEditCard,
}) => {
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showDeleteModal, toggleShowDeleteModal] = useToggle();
  const [showMoveModal, toggleShowMoveModal] = useToggle();
  const [showEditModal, toggleShowEditModal] = useToggle();
  const [{ page = 1, layout, orderByAdvanced, addedWithin }] = useQueryParams({
    page: NumberParam,
    addedWithin: NumberParam,
    orderByAdvanced: StringParam,
    layout: StringParam,
  });

  const [search, setSearch] = useState('');

  const offset = pageSize * (page - 1);
  const filteredCards = filterCards(cards, {
    name: search,
    addedWithin,
  });
  const sortedCards = sortCards(filteredCards, orderByAdvanced);
  const slicedCards = sortedCards.slice(offset, offset + pageSize);

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
    setSelectedCards([]);
  };

  const isAnyModalVisible = showDeleteModal || showMoveModal;

  return (
    <>
      <PaginatedCardList
        showAddedBeforeFilter
        showCollectionFilters
        orderByParamName="orderByAdvanced"
        loading={loading}
        setSearch={setSearch}
        search={search}
        cards={slicedCards}
        onEditCard={toggleShowEditModal}
        widthOffset={widthOffset}
        numberOfCards={filteredCards.length}
        setSelectedCards={setSelectedCards}
        selectedCards={isAnyModalVisible ? [] : selectedCards}
        hiddenColumns={hiddenColumns}
        title={title}
        onDeleteCards={toggleShowDeleteModal}
        onMoveCards={toggleShowMoveModal}
      />
      {showDeleteModal && (
        <ConfirmDeleteCards
          onDelete={onDelete}
          cardsToDelete={selectedCards}
          onCancel={onCancel}
          numberOfSelectedCards={numberOfSelectedCards}
        />
      )}
      {showMoveModal && (
        <AddCardsTo
          hideAddToCollection={hideAddToCollection}
          cardsToAdd={selectedCards}
          onCancel={onCancel}
          numberOfSelectedCards={numberOfSelectedCards}
        />
      )}
      {showEditModal && (
        <EditCardModal
          onEdit={onEditCard}
          card={selectedCards[0]}
          onCancel={onCancel}
        />
      )}
    </>
  );
};
