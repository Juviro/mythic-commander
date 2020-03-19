import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam, BooleanParam } from 'use-query-params';
import CardList from '../../Elements/CardList';
import { ListOrder } from '../../Elements';
import SearchButton from './SearchButton';
import Header from './Header';
import { paginatedCards } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/CardList/CardList';
import CardModal from '../Card/CardModal';
import CollapsableFilter from '../../Elements/Filter/CollapsableFilter';
import NameFilter from '../../Elements/Filter/TextFilter/NameFilter';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
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
  const [loading, setLoading] = useState(false);
  const [options, setFilter] = useQueryParams({
    name: StringParam,
    set: StringParam,
    text: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    isCommanderLegal: BooleanParam,
    orderBy: StringParam,
  });

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const onLoadCards = (searchOptions, offset = 0) => {
    setCurrentOptions(searchOptions);
    const search = async () => {
      setLoading(true);
      const { data } = await client.query({
        fetchPolicy: 'cache-first',
        query: paginatedCards,
        variables: {
          offset,
          limit: CARDS_PER_PAGE,
          options: searchOptions,
        },
      });
      setQueryResult(data.paginatedCards);
      const { cards } = data.paginatedCards;
      const newCards = offset ? (allCards || []).concat(cards) : cards;
      setAllCards(newCards);
      setFilter({
        displayedResults: data.paginatedCards.nextOffset || newCards.length,
      });
      setLoading(false);
    };
    search();
  };

  const onSearch = () => {
    onLoadCards(options);
  };

  const onLoadMore = () => {
    onLoadCards(currentOptions, nextOffset);
  };

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
        <ListOrder />
        <SearchButton onSearch={onSearch} loading={loading} />
        <Divider />
        {allCards && (
          <CardList
            basePath="/m/cards"
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
