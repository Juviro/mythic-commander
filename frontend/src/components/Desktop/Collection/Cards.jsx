import React from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { PaginatedCardList } from '../../Elements/Desktop';
import { filterCards, sortCards } from '../../../utils/cardFilter';
import { useStoredQueryParam } from '../../Hooks';

export default ({ cards, loading, isSidebarVisible }) => {
  const widthOffset = isSidebarVisible ? 300 : 0;
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
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
      />
    </>
  );
};
