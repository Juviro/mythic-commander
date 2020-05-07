import React, { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useStoredQueryParam, useToggle } from '../../../Hooks';
import { filterCards, sortCards } from '../../../../utils/cardFilter';
import PaginatedCardList from '../PaginatedCardList';
import { ConfirmDelete } from '../../Shared';

export default ({ cards, loading, widthOffset, deleteByOracle }) => {
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [cardIdsToDelete, setCardIdsToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useToggle();
  const [{ page = 1, orderByAdvanced, addedWithin }] = useQueryParams({
    page: NumberParam,
    addedWithin: NumberParam,
    orderByAdvanced: StringParam,
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
    cardIdsToDelete &&
    slicedCards.filter(({ oracle_id }) => cardIdsToDelete.includes(oracle_id));

  const onDelete = numberOfCards => {
    deleteByOracle(cardIdsToDelete, numberOfCards);
    setCardIdsToDelete([]);
  };

  useEffect(() => {
    if (cardsToDelete.length) return;
    setShowDeleteModal(false);
    // eslint-disable-next-line
  }, [cardsToDelete.length]);

  useEffect(() => {
    setCardIdsToDelete([]);
    // eslint-disable-next-line
  }, [page]);

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
        setCardIdsToDelete={setCardIdsToDelete}
        onDeleteCards={setShowDeleteModal}
        cardIdsToDelete={cardIdsToDelete}
      />
      {showDeleteModal && (
        <ConfirmDelete
          onCancel={() => setCardIdsToDelete([])}
          onOk={onDelete}
          cardsToDelete={cardsToDelete}
        />
      )}
    </>
  );
};
