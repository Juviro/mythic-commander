import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { PaginatedCardList } from '../../Elements/Desktop';
import { filterCards, sortCards } from '../../../utils/cardFilter';
import { useStoredQueryParam, useToggle } from '../../Hooks';
import { deleteAllFromCollection, getCollectionDesktop } from './queries';
import message from '../../../utils/message';
import { ConfirmDelete } from '../../Elements/Shared';

export default ({ cards, loading, isSidebarVisible }) => {
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [mutate] = useMutation(deleteAllFromCollection);
  const [cardIdsToDelete, setCardIdsToDelete] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useToggle();
  const [{ page = 1, orderByCollection, addedWithin }] = useQueryParams({
    page: NumberParam,
    // name: StringParam,
    addedWithin: NumberParam,
    orderByCollection: StringParam,
  });

  const [search, setSearch] = useState('');

  const offset = pageSize * (page - 1);
  const filteredCards = filterCards(cards, {
    name: search,
    addedWithin,
  });
  const sortedCards = sortCards(filteredCards, orderByCollection);
  const slicedCards = sortedCards.slice(offset, offset + pageSize);

  const widthOffset = isSidebarVisible ? 300 : 0;

  const deleteByOracle = numberOfCards => {
    const oracleIds = cardIdsToDelete;
    setCardIdsToDelete([]);
    const numberOfCardsLabel =
      numberOfCards > 1 ? `<b>${numberOfCards}</b> cards` : '';

    message(`Deleted ${numberOfCardsLabel} from your collection!`);
    mutate({
      variables: { oracleIds },
      update: cache => {
        const existing = cache.readQuery({
          query: getCollectionDesktop,
        });

        const updatedCards = existing.collection.cards.filter(
          ({ card }) =>
            !oracleIds.some(oracle_id => card.oracle_id === oracle_id)
        );

        cache.writeQuery({
          query: getCollectionDesktop,
          data: {
            collection: {
              ...existing.collection,
              cards: updatedCards,
            },
          },
        });
      },
    });
  };
  const cardsToDelete =
    cardIdsToDelete &&
    slicedCards.filter(({ oracle_id }) => cardIdsToDelete.includes(oracle_id));

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
        orderByParamName="orderByCollection"
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
          onOk={deleteByOracle}
          cardsToDelete={cardsToDelete}
        />
      )}
    </>
  );
};
