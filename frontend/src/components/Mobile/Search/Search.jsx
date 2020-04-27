import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';

import {
  LayoutAndSortPicker,
  CollapsableFilter,
  SearchButton,
} from '../../Elements/Shared';
import { CardListMobile as CardList } from '../../Elements/Mobile';
import Header from './Header';
import { cardSearch } from './queries';
import CardModal from '../Card/CardModal';
import NameFilter from '../../Elements/Shared/Filter/TextFilter/NameFilter';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import { useToggle, useStoredQueryParam } from '../../Hooks';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import searchParams from '../../../constants/searchParams';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Search = ({ history }) => {
  const [allCards, setAllCards] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [loading, toggleLoading] = useToggle(false);
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [options, setParams] = useQueryParams(searchParams);
  const [currentOptions, setCurrentOptions] = useState(options);

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const fetchCards = async (searchOptions, offset = 0) => {
    toggleLoading(true);
    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: cardSearch,
      variables: {
        offset,
        limit: CARDS_PER_PAGE,
        options: { ...searchOptions, orderBy },
      },
    });
    setQueryResult(data.cardSearch);
    const { cards } = data.cardSearch;
    const newCards = offset ? (allCards || []).concat(cards) : cards;
    setAllCards(newCards.map(unifySingleCard));
    toggleLoading(false);
  };

  const onSearch = () => {
    setParams(currentOptions);
    fetchCards(currentOptions);
  };

  const onLoadMore = () => {
    fetchCards(options, nextOffset);
  };

  // search when initial values are set or params change
  useEffect(() => {
    const hasOptions = Object.values(options).some(val => val !== undefined);
    if (!hasOptions) return;
    // TODO:: only scroll to top if options changed
    setTimeout(() => window.scrollTo(0, 0), 100);
    setCurrentOptions(options);
    fetchCards(options);
    // eslint-disable-next-line
  }, [history.location.search]);

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

  const isFilterResettable = Object.values(currentOptions).some(Boolean);

  return (
    <>
      <StyledWrapper>
        <Header
          onResetOptions={onResetOptions}
          isFilterResettable={isFilterResettable}
        />
        <NameFilter
          onSearch={onSearch}
          size="large"
          value={currentOptions.name}
          onChange={onChangeOption('name')}
        />
        <CollapsableFilter
          hideReset
          advancedSearch
          hideNameFilter
          headerText="Advanced"
          onSearch={onSearch}
          onChangeOption={onChangeOption}
          options={currentOptions}
        />
        <LayoutAndSortPicker />
        <SearchButton
          onSearch={onSearch}
          loading={loading}
          style={{ marginTop: 24 }}
        />
        <Divider />
        {allCards && (
          <CardList
            showTotalResults
            cards={allCards}
            hasMore={hasMore}
            loading={loading}
            totalResults={totalResults}
            onLoadMore={onLoadMore}
          />
        )}
      </StyledWrapper>
      <CardModal />
    </>
  );
};

export default withRouter(Search);
