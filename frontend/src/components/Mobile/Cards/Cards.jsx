import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam, BooleanParam } from 'use-query-params';
import { LayoutAndSortPicker, CollapsableFilter } from '../../Elements/Shared';
import { CardListMobile as CardList } from '../../Elements/Mobile';
import SearchButton from './SearchButton';
import Header from './Header';
import { cardSearch } from './queries';
import CardModal from '../Card/CardModal';
import NameFilter from '../../Elements/Shared/Filter/TextFilter/NameFilter';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import { useToggle } from '../../Hooks';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const [allCards, setAllCards] = useState(null);
  const [currentOptions, setCurrentOptions] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [loading, toggleLoading] = useToggle(false);
  const [{ autoSearch, ...options }, setFilter] = useQueryParams({
    autoSearch: StringParam,

    name: StringParam,
    rarity: StringParam,
    cmc: StringParam,
    power: StringParam,
    toughness: StringParam,
    set: StringParam,
    text: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    isOwned: BooleanParam,
    isCommanderLegal: BooleanParam,
    orderBy: StringParam,
  });

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const onLoadCards = async (searchOptions, offset = 0) => {
    setCurrentOptions(searchOptions);
    toggleLoading(true);
    const { data } = await client.query({
      fetchPolicy: 'cache-first',
      query: cardSearch,
      variables: {
        offset,
        limit: CARDS_PER_PAGE,
        options: searchOptions,
      },
    });
    setQueryResult(data.cardSearch);
    const { cards } = data.cardSearch;
    const newCards = offset ? (allCards || []).concat(cards) : cards;
    setAllCards(newCards);
    toggleLoading(false);
  };

  const onSearch = () => {
    onLoadCards(options);
  };

  const onLoadMore = () => {
    onLoadCards(currentOptions, nextOffset);
  };

  useEffect(() => {
    if (!autoSearch) return;
    const autoLoadCards = async () => {
      await onLoadCards(options);
      setFilter({ autoSearch: '' });
    };
    autoLoadCards();
    // eslint-disable-next-line
  }, [autoSearch]);

  return (
    <>
      <StyledWrapper>
        <Header />
        <NameFilter onSearch={onSearch} size="large" />
        <CollapsableFilter
          hideReset
          advacedSearch
          hideNameFilter
          headerText="Advanced"
          onSearch={onSearch}
        />
        <LayoutAndSortPicker />
        <SearchButton onSearch={onSearch} loading={loading} />
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
