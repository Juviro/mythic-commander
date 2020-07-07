import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';
import { useParams } from 'react-router';
import { Input, Divider } from 'antd';

import CardListMobile from '../../Elements/Mobile/CardListMobile/index';
import { paginatedCollection } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import unifyCardFormat from '../../../utils/unifyCardFormat';
import { Flex, FoundCardsLabel, FindWantedCards } from '../../Elements/Shared';

export default () => {
  const { username } = useParams();
  const [search, setSearch] = useState('');
  const [{ orderByAdvanced = '' }] = useQueryParams({
    orderByAdvanced: StringParam,
  });
  const { data, loading, fetchMore } = useQuery(paginatedCollection, {
    variables: {
      limit: CARDS_PER_PAGE,
      offset: 0,
      orderBy: orderByAdvanced,
      search,
      username,
    },
  });

  const {
    cards = [],
    totalResults = 0,
    hasMore,
    nextOffset,
    search: currentSearch,
  } = data ? data.paginatedCollection : {};

  const formattedCards = unifyCardFormat(cards);

  const onLoadMore = () => {
    if (!nextOffset) return;
    fetchMore({
      variables: {
        offset: nextOffset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev.paginatedCollection;
        return {
          paginatedCollection: {
            ...fetchMoreResult.paginatedCollection,
            cards: [
              ...prev.paginatedCollection.cards,
              ...fetchMoreResult.paginatedCollection.cards,
            ],
          },
        };
      },
    });
  };

  return (
    <Flex direction="column" style={{ width: '100%' }}>
      <Input.Search
        allowClear
        onSearch={value => setSearch(value)}
        style={{ marginTop: 16 }}
        placeholder="Search for a card"
      />
      {username && <FindWantedCards style={{ marginTop: 16 }} />}
      <Divider />
      <FoundCardsLabel
        totalResults={totalResults}
        search={currentSearch}
        loading={loading}
      />
      <CardListMobile
        hasMore={hasMore}
        loading={loading}
        cards={formattedCards}
        onLoadMore={onLoadMore}
        totalResults={totalResults}
      />
    </Flex>
  );
};
