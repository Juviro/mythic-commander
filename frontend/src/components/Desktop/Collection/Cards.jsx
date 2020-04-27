import React from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';

import { PaginatedCardList } from '../../Elements/Desktop';
import { filterCards } from '../../../utils/cardFilter';
import { useStoredQueryParam } from '../../Hooks';

export default ({ cards, loading, isSidebarVisible }) => {
  const widthOffset = isSidebarVisible ? 300 : 0;
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [{ page = 1, name }] = useQueryParams({
    page: NumberParam,
    name: StringParam,
  });

  const offset = pageSize * (page - 1);

  const filteredCards = filterCards(cards, {
    name,
  });

  const slicedCards = filteredCards.slice(offset, offset + pageSize);

  return (
    <>
      <PaginatedCardList
        showSorter
        showNameSearch
        loading={loading}
        cards={slicedCards}
        widthOffset={widthOffset}
        numberOfCards={filteredCards.length}
      />
    </>
  );
};
