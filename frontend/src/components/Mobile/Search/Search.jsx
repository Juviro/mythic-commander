import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';
import { withRouter } from 'react-router';
import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';

import { LayoutAndSortPicker, SearchButton, Filter } from '../../Elements/Shared';
import { CardListMobile as CardList } from '../../Elements/Mobile';
import Header from './Header';
import { cardSearch } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import { useToggle, useStoredQueryParam } from '../../Hooks';
import { unifySingleCard } from '../../../utils/unifyCardFormat';
import searchParams from '../../../constants/searchParams';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Search = ({ history }) => {
  const buttonRef = useRef(null);
  const [allCards, setAllCards] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [loading, toggleLoading] = useToggle(false);
  const [orderBy] = useStoredQueryParam('orderBy', StringParam);
  const [options, setParams] = useQueryParams(searchParams);
  const [currentOptions, setCurrentOptions] = useState(options);

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const fetchCards = async (searchOptions, offset = 0) => {
    if (!orderBy) return;
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
    const hasOptions = Object.values(options).some((val) => val !== undefined);
    if (!hasOptions) return;
    if (loading && buttonRef) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
    setCurrentOptions(options);
    fetchCards(options);
    // eslint-disable-next-line
  }, [history.location.search]);

  const onChangeOption = (key) => (value) => {
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
        <Header />
        <Divider />
        <Filter
          headerText="Advanced"
          onSearch={onSearch}
          onChangeOption={onChangeOption}
          options={currentOptions}
        />
        <LayoutAndSortPicker />
        <SearchButton
          buttonRef={buttonRef}
          onSearch={onSearch}
          loading={loading}
          onResetOptions={onResetOptions}
          isFilterResettable={isFilterResettable}
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
    </>
  );
};

export default withRouter(Search);
