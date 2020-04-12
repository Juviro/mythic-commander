import React, { useState } from 'react';
import { useQueryParams } from 'use-query-params';
import { useApolloClient } from 'react-apollo';
import { useToggle } from '../../Hooks';
import Sidebar from './Sidebar';
import searchParams from '../../../constants/searchParams';
import { cardSearch } from './queries';
import { unifySingleCard } from '../../../utils/unifyCardFormat';

const CARDS_PER_PAGE = 20;

export default () => {
  const [currentCards, setCurrentCards] = useState(null);
  console.log('currentCards :', currentCards);
  const [isSidebarVisible, toggleIsSidebarVisible] = useToggle(true);
  const [currentOptions, setCurrentOptions] = useState(null);
  const [loading, toggleLoading] = useToggle(false);
  const [queryResult, setQueryResult] = useState({});
  const [options, setFilter] = useQueryParams(searchParams);

  const client = useApolloClient();

  const onSearch = async () => {
    setCurrentOptions(options);
    toggleLoading(true);
    const currentPage = 1;
    const offset = (currentPage - 1) * CARDS_PER_PAGE;

    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: cardSearch,
      variables: {
        offset,
        limit: CARDS_PER_PAGE,
        options,
      },
    });
    setQueryResult(data.cardSearch);
    const { cards } = data.cardSearch;
    setCurrentCards(cards.map(unifySingleCard));
    toggleLoading(false);
  };

  return (
    <>
      <Sidebar
        onSearch={onSearch}
        isVisible={isSidebarVisible}
        toggleIsVisible={toggleIsSidebarVisible}
      />
    </>
  );
};
