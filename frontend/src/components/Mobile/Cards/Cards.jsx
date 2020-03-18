import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

import { useApolloClient } from 'react-apollo';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import CardList from '../../Elements/CardList';
import { ListOrder, Filter } from '../../Elements';
import SearchButton from './SearchButton';
import Header from './Header';
import { paginatedCards } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/CardList/CardList';
import CardModal from '../Card/CardModal';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default () => {
  const [allCards, setAllCards] = useState(null);
  const [queryResult, setQueryResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [{ displayedResults, ...options }, setFilter] = useQueryParams({
    name: StringParam,
    set: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    displayedResults: NumberParam,
    orderBy: StringParam,
  });

  const client = useApolloClient();

  const { hasMore, nextOffset = 0, totalResults = 0 } = queryResult;

  const onSearch = ({ offset, limit }) => {
    const search = async () => {
      setLoading(true);
      const { data } = await client.query({
        fetchPolicy: 'cache-first',
        query: paginatedCards,
        variables: {
          offset,
          limit,
          options,
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

  const onLoadMore = () => {
    onSearch({ offset: nextOffset, limit: CARDS_PER_PAGE });
  };

  return (
    <>
      <StyledWrapper>
        <Header />
        <Filter advacedSearch />
        <ListOrder />
        <SearchButton
          onSearch={() => {
            onSearch({ offset: 0, limit: CARDS_PER_PAGE });
          }}
          loading={loading}
        />
        <Divider />
        {allCards && (
          <CardList
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
