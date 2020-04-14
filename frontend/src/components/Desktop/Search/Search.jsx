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
  const [{ page, pageSize, ...options }, setParams] = useQueryParams({
    pageSize: NumberParam,
    page: NumberParam,
    ...searchParams,
  });

  const client = useApolloClient();

  const fetchCards = async (searchOptions = options, offset, isPreload) => {
    setCurrentOptions(searchOptions);
    if (!isPreload) {
      toggleLoading(true);
      //   setCurrentCards([]);
    }

    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: cardSearch,
      variables: {
        offset: offset || 0,
        options: searchOptions,
        limit: pageSize,
      },
    });
    if (isPreload) return;

    const { cards, totalResults } = data.cardSearch;
    // hotfix if offset is incorrect due to layout switch
    if (!cards.length && totalResults) return;

    setQueryResult(data.cardSearch);
    setCurrentCards(cards.map(unifySingleCard));
    toggleLoading(false);
  };

  const onSearch = () => {
    setParams({ page: 1 });
    fetchCards(options, 0);
  };

  // search when page changes or site is reloaded
  useEffect(() => {
    if (!pageSize || !page) return;
    const offset = (page - 1) * pageSize;
    fetchCards(currentOptions || options, offset);
    // eslint-disable-next-line
  }, [page, pageSize]);

  // preload next page
  useEffect(() => {
    if (!currentCards || !currentCards.length || !queryResult.hasMore) return;
    const nextPageOffset = page * pageSize;
    fetchCards(currentOptions, nextPageOffset, true);
    // eslint-disable-next-line
  }, [currentCards]);

  // reset search when clicking search again
  useEffect(() => {
    if (page) return;
    setCurrentCards([]);
    setCurrentOptions(null);
    setQueryResult({});
    toggleLoading(false);
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
        widthOffset={isSidebarVisible ? 321 : 0}
        numberOfCards={queryResult.totalResults}
      />
    </StyledWrapper>
  );
};
