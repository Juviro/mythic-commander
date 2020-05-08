import React, { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useStoredQueryParam, useToggle } from '../../../Hooks';
import { filterCards, sortCards } from '../../../../utils/cardFilter';
import PaginatedCardList from '../PaginatedCardList';
import { ConfirmDeleteCards } from '../../Shared';

export default ({
  cards,
  loading,
  widthOffset,
  deleteByOracle,
  title,
  hiddenColumns,
}) => {
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useToggle();
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

  const cardsToDelete =
    selectedCardIds &&
    slicedCards.filter(({ oracle_id }) => selectedCardIds.includes(oracle_id));

  const onDelete = numberOfCards => {
    deleteByOracle(selectedCardIds, numberOfCards);
    setSelectedCardIds([]);
  };

  useEffect(() => {
    if (cardsToDelete.length) return;
    setShowDeleteModal(false);
    // eslint-disable-next-line
  }, [cardsToDelete.length]);

  useEffect(() => {
    setSelectedCardIds([]);
    // eslint-disable-next-line
  }, [page, layout]);

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
        widthOffset={widthOffset}
        numberOfCards={filteredCards.length}
        setSelectedCardIds={setSelectedCardIds}
        onDeleteCards={setShowDeleteModal}
        selectedCardIds={selectedCardIds}
        hiddenColumns={hiddenColumns}
        title={title}
      />
      {showDeleteModal && (
        <ConfirmDeleteCards
          onCancel={() => setSelectedCardIds([])}
          onOk={onDelete}
          cardsToDelete={cardsToDelete}
        />
      )}
    </>
  );
};
