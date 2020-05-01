import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { PaginatedCardList } from '../../Elements/Desktop';
import { filterCards, sortCards } from '../../../utils/cardFilter';
import { useStoredQueryParam } from '../../Hooks';
import { deleteAllFromCollection, getCollectionDesktop } from './queries';
import message from '../../../utils/message';
import { ConfirmDelete } from '../../Elements/Shared';

export default ({ cards, loading, isSidebarVisible }) => {
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [mutate] = useMutation(deleteAllFromCollection);
  const [cardIdsToDelete, setCardIdsToDelete] = useState(null);
  const [{ page = 1, orderByCollection, name, addedWithin }] = useQueryParams({
    page: NumberParam,
    name: StringParam,
    addedWithin: NumberParam,
    orderByCollection: StringParam,
  });

  const offset = pageSize * (page - 1);
  const filteredCards = filterCards(cards, {
    name,
    addedWithin,
  });
  const sortedCards = sortCards(filteredCards, orderByCollection);
  const slicedCards = sortedCards.slice(offset, offset + pageSize);

  const widthOffset = isSidebarVisible ? 300 : 0;

  const deleteByOracle = () => {
    const oracleIds = cardIdsToDelete;
    setCardIdsToDelete(null);
    const numberOfCardsLabel =
      oracleIds.length > 1 ? `<b>${oracleIds.length}</b> cards` : '';
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

  const onDeleteCards = oracleIds => {
    setCardIdsToDelete(oracleIds);
  };

  const cardsToDelete =
    cardIdsToDelete &&
    cards.filter(({ oracle_id }) => cardIdsToDelete.includes(oracle_id));
  return (
    <>
      <PaginatedCardList
        showNameSearch
        showAddedBeforeFilter
        showCollectionFilters
        orderByParamName="orderByCollection"
        loading={loading}
        cards={slicedCards}
        widthOffset={widthOffset}
        numberOfCards={filteredCards.length}
        onDeleteCards={onDeleteCards}
      />
      <ConfirmDelete
        onCancel={() => setCardIdsToDelete(null)}
        onOk={deleteByOracle}
        cardsToDelete={cardsToDelete}
      />
    </>
  );
};
