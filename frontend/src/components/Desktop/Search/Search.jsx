import React, { useState, useEffect } from 'react';
import { useQueryParams, NumberParam, StringParam } from 'use-query-params';
import { useApolloClient } from 'react-apollo';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { isEqual } from 'lodash';

import Sidebar from './Sidebar';
import { cardSearch } from './queries';
import { useToggle, useStoredQueryParam } from '../../Hooks';
import searchParams from '../../../constants/searchParams';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import { PaginatedCardList } from '../../Elements/Desktop';
import preloadImages from '../../../utils/preloadImages';
import useLocalStorage from '../../Hooks/useLocalStorage';
import { lightBackground } from '../../../constants/colors';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  height: fit-content;
  min-height: 100%;
  background-color: ${({ isFullscreen }) =>
    isFullscreen ? lightBackground : 'white'};
`;

const Search = ({ history }) => {
  const [currentCards, setCurrentCards] = useState([]);
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);
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

  // start a new search if page or pageSize changes
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
    toggleIsSidebarVisible(true);
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

  const isFullscreen = !isSearching;

  return (
    <StyledWrapper isFullscreen={isFullscreen}>
      <Sidebar
        loading={loading}
        onSearch={onSearch}
        onResetOptions={onResetOptions}
        onChangeOption={onChangeOption}
        options={currentOptions}
        isVisible={isSidebarVisible}
        isFullscreen={isFullscreen}
        toggleIsVisible={toggleIsSidebarVisible}
      />
      {isSearching && (
        <PaginatedCardList
          loading={loading}
          search={lastSearchOptions.name}
          hiddenColumns={['added', 'amount']}
          cards={currentCards}
          widthOffset={isSidebarVisible ? 329 : 0}
          numberOfCards={queryResult.totalResults}
        />
      )}
    </StyledWrapper>
  );
};

export default withRouter(Search);
