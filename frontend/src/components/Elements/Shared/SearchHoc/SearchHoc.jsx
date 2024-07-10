import { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useApolloClient } from '@apollo/client';

import { cardSearch } from './queries';
import { useToggle, useStoredQueryParam } from '../../../Hooks';
import searchParams from '../../../../constants/searchParams';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import preloadImages from '../../../../utils/preloadImages';
import useLocalStorage from '../../../Hooks/useLocalStorage';

export default ({ children, researchOnOrderChange, blockInitialSearch = false }) => {
  const [currentCards, setCurrentCards] = useState([]);
  const [loading, toggleLoading] = useToggle(false);
  const [error, setError] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [initialPageSize, setInitialPageSize] = useLocalStorage('pageSize', 20);
  const [lastSearchOptions, setLastSearchOptions] = useState({});
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [params, setParams] = useQueryParams({
    page: NumberParam,
    pageSize: NumberParam,
    ...searchParams,
  });
  const { page, pageSize, ...options } = params;
  const hasSearchOptions = Object.values(options).some(Boolean);
  const [isSearching, setIsSearching] = useToggle(
    hasSearchOptions && !blockInitialSearch
  );
  const [currentOptions, setCurrentOptions] = useState(options);

  const client = useApolloClient();

  const fetchCards = async (searchOptions, offset = 0, isPreload = false) => {
    if (!orderBy) return null;
    if (!isPreload) {
      toggleLoading(true);
      setLastSearchOptions({ ...searchOptions, orderBy, pageSize });
    }

    try {
      const { data } = await client.query({
        query: cardSearch,
        variables: {
          offset: offset || 0,
          options: { ...searchOptions, orderBy },
          limit: pageSize || Number(initialPageSize),
        },
      });
      if (isPreload) return data.cardSearch.cards;

      const { cards, totalResults } = data.cardSearch;
      if (!cards.length && totalResults) return null;

      setQueryResult(data.cardSearch);
      setCurrentCards(cards.map(unifySingleCard));
      toggleLoading(false);
    } catch (currentError) {
      setError('Error fetching cards. Please try another search query');
    }
    return null;
  };

  const onSearch = () => {
    setParams(
      {
        page: 1,
        pageSize: pageSize || initialPageSize,
        ...currentOptions,
      },
      'pushIn'
    );
    setIsSearching(true);
    fetchCards(currentOptions);
  };

  // store initialPageSize
  useEffect(() => {
    if (!pageSize) {
      setParams({ pageSize: initialPageSize });
    } else {
      setInitialPageSize(pageSize);
    }
    // eslint-disable-next-line
  }, [pageSize]);

  // start a new search when page or pageSize changes
  useEffect(() => {
    if (!pageSize || !isSearching) return;
    const offset = (page - 1) * pageSize;
    fetchCards(options, offset);
    // eslint-disable-next-line
  }, [page, pageSize]);

  // re-search when order changes
  useEffect(() => {
    if (!researchOnOrderChange || !isSearching) return;
    setParams({ page: 1 }, 'replaceIn');
    fetchCards(options, 0);
    // eslint-disable-next-line
  }, [orderBy]);

  // preload next page
  useEffect(() => {
    if (!currentCards || !currentCards.length || !queryResult.hasMore) return;
    const prefetchCards = async () => {
      const nextPageOffset = page * pageSize;
      const nextPageCards = await fetchCards(options, nextPageOffset, true);
      preloadImages(nextPageCards, ['small', 'normal']);
    };
    prefetchCards();
    // eslint-disable-next-line
  }, [currentCards]);

  // reset search when clicking search again
  useEffect(() => {
    if (page || loading) return;
    setCurrentCards([]);
    setCurrentOptions(options);
    setQueryResult({});
    toggleLoading(false);
    if (!hasSearchOptions) {
      setIsSearching(false);
      setParams({}, 'replace');
    } else {
      setIsSearching(true);
    }
    // eslint-disable-next-line
  }, [page]);

  const onChangeOption = (key) => (value) => {
    setCurrentOptions({ ...currentOptions, [key]: value });
  };

  const onResetOptions = () => {
    const defaultOptions = Object.keys(options).reduce(
      (acc, val) => ({ ...acc, [val]: undefined }),
      {}
    );
    setCurrentOptions(defaultOptions);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const numberOfCards = queryResult.totalResults;

  return children({
    isSearching,
    loading,
    error,
    onSearch,
    onResetOptions,
    onChangeOption,
    currentOptions,
    lastSearchOptions,
    currentCards,
    numberOfCards,
  });
};
