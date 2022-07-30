import { useEffect, useState } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useLazyQuery } from '@apollo/client';

import { paginatedCollection } from './queries';
import unifyCardFormat from '../../../../utils/unifyCardFormat';

export default ({ children, username }) => {
  const [{ page = 1, pageSize = 0, addedWithin, orderByAdvanced = '' }, setParams] =
    useQueryParams({
      page: NumberParam,
      addedWithin: NumberParam,
      pageSize: NumberParam,
      orderByAdvanced: StringParam,
    });
  const [search, setSearch] = useState('');
  const offset = (page - 1) * pageSize;
  const [fetchCards, { called, data, loading }] = useLazyQuery(paginatedCollection, {
    variables: {
      limit: pageSize,
      offset,
      orderBy: orderByAdvanced,
      addedWithin,
      search,
      username,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!called && pageSize) fetchCards();
  }, [pageSize, called, fetchCards]);

  const onSearch = (query) => {
    setParams({ page: 1 });
    setSearch(query);
  };

  const cards = data ? unifyCardFormat(data.paginatedCollection.cards) : [];
  const numberOfCards = data ? data.paginatedCollection.totalResults : 0;

  useEffect(() => {
    if (!numberOfCards) return;
    if (numberOfCards < offset + pageSize) {
      const lastPage = Math.ceil(numberOfCards / pageSize);
      setParams({ page: lastPage });
    }
    // eslint-disable-next-line
  }, [numberOfCards]);

  return children({
    numberOfCards,
    loading,
    cards,
    search,
    setSearch: onSearch,
  });
};
