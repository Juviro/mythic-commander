import { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useApolloClient } from 'react-apollo';
import { withRouter } from 'react-router';
import { isEqual } from 'lodash';

import { cardSearch } from './queries';
import { useToggle, useStoredQueryParam } from '../../../Hooks';
import searchParams from '../../../../constants/searchParams';
import { unifySingleCard } from '../../../../utils/unifyCardFormat';
import preloadImages from '../../../../utils/preloadImages';
import useLocalStorage from '../../../Hooks/useLocalStorage';

const Search = ({ history, children }) => {
  const [currentCards, setCurrentCards] = useState([]);
  const [loading, toggleLoading] = useToggle(false);
  const [queryResult, setQueryResult] = useState({});
  const [initialPageSize, setInitialPageSize] = useLocalStorage(
    'pageSize',
    100
  );
  const [lastSearchOptions, setLastSearchOptions] = useState({});
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [params, setParams] = useQueryParams({
    page: NumberParam,
    pageSize: NumberParam,
    ...searchParams,
  });
  const { page, pageSize, ...options } = params;
  const hasSearchOptions = Object.values(options).some(Boolean);
  const [isSearching, setIsSearching] = useToggle(hasSearchOptions);
  const [currentOptions, setCurrentOptions] = useState(options);

  const client = useApolloClient();

  const fetchCards = async (searchOptions, offset = 0, isPreload = false) => {
    if (!orderBy) return null;
    if (!isPreload) {
      toggleLoading(true);
      setLastSearchOptions({ ...searchOptions, orderBy, pageSize });
    }

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

  // start a new search if page or pageSize or orderBy changes
  useEffect(() => {
    if (!isSearching && !hasSearchOptions) return;
    if (!isSearching) {
      setIsSearching(true);
      setCurrentOptions(options);
    }

    if (pageSize) {
      setInitialPageSize(pageSize);
    } else {
      setParams({ pageSize: initialPageSize }, 'replaceIn');
    }

    const didOptionsChange = !isEqual(lastSearchOptions, {
      ...options,
      orderBy,
      pageSize,
    });

    // reset cards list (including element position) when re-searching
    if (didOptionsChange) {
      setCurrentCards([]);
      setCurrentOptions(options);
    }

    let nextPage = page;
    // reset page when search order changes
    if (lastSearchOptions.orderBy && lastSearchOptions.orderBy !== orderBy) {
      setParams({ page: 1 }, 'replaceIn');
      nextPage = 1;
    }

    const offset = (nextPage - 1) * pageSize;
    fetchCards(options, offset);
    // eslint-disable-next-line
  }, [history.location.search]);

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

  const onChangeOption = key => value => {
    setCurrentOptions({ ...currentOptions, [key]: value });
  };

  const onResetOptions = () => {
    const defaultOptions = Object.keys(options).reduce(
      (acc, val) => ({ ...acc, [val]: undefined }),
      {}
    );
    setCurrentOptions(defaultOptions);
  };

  const numberOfCards = queryResult.totalResults;

  return children({
    isSearching,
    loading,
    onSearch,
    onResetOptions,
    onChangeOption,
    currentOptions,
    lastSearchOptions,
    currentCards,
    numberOfCards,
  });
};

export default withRouter(Search);
