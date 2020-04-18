import React, { useState, useEffect } from 'react';
import { useQueryParams, NumberParam } from 'use-query-params';
import { useApolloClient } from 'react-apollo';
import styled from 'styled-components';

import Sidebar from './Sidebar';
import { cardSearch } from './queries';
import { useToggle } from '../../Hooks';
import searchParams from '../../../constants/searchParams';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import { PaginatedCardList } from '../../Elements/Desktop';
import preloadImages from '../../../utils/preloadImages';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 49px);
`;

export default () => {
  const [currentCards, setCurrentCards] = useState([]);
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);
  const [currentOptions, setCurrentOptions] = useState(null);
  const [loading, toggleLoading] = useToggle(false);
  const [queryResult, setQueryResult] = useState({});
  const [{ page, pageSize, orderBy, ...options }, setParams] = useQueryParams({
    pageSize: NumberParam,
    page: NumberParam,
    ...searchParams,
  });

  const client = useApolloClient();

  const fetchCards = async (searchOptions = options, offset, isPreload) => {
    setCurrentOptions(searchOptions);
    if (!isPreload) {
      toggleLoading(true);
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
    setParams({ page: 1 });
    fetchCards(options, 0);
  };

  // search when page changes or site is reloaded or order is changed
  useEffect(() => {
    const hasOptions = Object.values(options).some(val => val !== undefined);
    if (!pageSize || !page || !hasOptions) return;
    const offset = (page - 1) * pageSize;
    fetchCards(currentOptions || options, offset);
    // eslint-disable-next-line
  }, [page, pageSize, orderBy]);

  // preload next page
  useEffect(() => {
    if (!currentCards || !currentCards.length || !queryResult.hasMore) return;
    const prefetchCards = async () => {
      const nextPageOffset = page * pageSize;
      const nextPageCards = await fetchCards(
        currentOptions,
        nextPageOffset,
        true
      );
      preloadImages(nextPageCards, ['small', 'normal']);
    };
    prefetchCards();
    // eslint-disable-next-line
  }, [currentCards]);

  // reset search when clicking search again
  useEffect(() => {
    if (page) return;
    setCurrentCards([]);
    setCurrentOptions(null);
    setQueryResult({});
    toggleLoading(false);
    // eslint-disable-next-line
  }, [page]);

  return (
    <StyledWrapper>
      <Sidebar
        onSearch={onSearch}
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
