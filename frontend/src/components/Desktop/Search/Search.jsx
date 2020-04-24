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

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
`;

const Search = ({ history }) => {
  const [currentCards, setCurrentCards] = useState([]);
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);
  const [loading, toggleLoading] = useToggle(false);
  const [queryResult, setQueryResult] = useState({});
  const [pageSize] = useStoredQueryParam('pageSize', NumberParam);
  const [lastSearchOptions, setLastSearchOptions] = useState({});
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [{ page = 1, ...options }, setParams] = useQueryParams({
    page: NumberParam,
    ...searchParams,
  });
  const [currentOptions, setCurrentOptions] = useState(options);

  const client = useApolloClient();

  const fetchCards = async (searchOptions, offset, isPreload) => {
    if (!isPreload) {
      toggleLoading(true);
      setLastSearchOptions(searchOptions);
    }

    const { data } = await client.query({
      query: cardSearch,
      variables: {
        offset: offset || 0,
        options: { ...searchOptions, orderBy },
        limit: pageSize,
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
    setParams({ page: 1, ...currentOptions });
  };

  // start a new search if query params change
  useEffect(() => {
    if (!pageSize) return;
    const offset = (page - 1) * pageSize;

    // reset cards list (including element position) when re-searching
    const shouldReset = !isEqual(lastSearchOptions, options);
    if (shouldReset) setCurrentCards([]);
    setCurrentOptions(options);
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
    if (page) return;
    setCurrentCards([]);
    setCurrentOptions(options);
    setQueryResult({});
    toggleLoading(false);
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

  return (
    <StyledWrapper>
      <Sidebar
        loading={loading}
        onSearch={onSearch}
        onResetOptions={onResetOptions}
        onChangeOption={onChangeOption}
        options={currentOptions}
        isVisible={isSidebarVisible}
        toggleIsVisible={toggleIsSidebarVisible}
      />
      <PaginatedCardList
        loading={loading}
        showSorter={false}
        hiddenColumns={['added', 'amount']}
        cards={currentCards}
        widthOffset={isSidebarVisible ? 329 : 0}
        numberOfCards={queryResult.totalResults}
      />
    </StyledWrapper>
  );
};

export default withRouter(Search);
