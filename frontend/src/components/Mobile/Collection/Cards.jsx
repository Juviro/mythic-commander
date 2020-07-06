import React from 'react';
import { useQuery } from 'react-apollo';
import { useQueryParams, StringParam } from 'use-query-params';
import { useParams } from 'react-router';

import CardListMobile from '../../Elements/Mobile/CardListMobile/index';
import { paginatedCollection } from './queries';
import { CARDS_PER_PAGE } from '../../Elements/Mobile/CardListMobile/FilteredCardList';
import unifyCardFormat from '../../../utils/unifyCardFormat';

export default () => {
  const { username } = useParams();
  const [{ orderByAdvanced = '' }] = useQueryParams({
    orderByAdvanced: StringParam,
  });
  const { data, loading, fetchMore } = useQuery(paginatedCollection, {
    variables: {
      limit: CARDS_PER_PAGE,
      offset: 0,
      orderBy: orderByAdvanced,
      search: '',
      username,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { cards = [], totalResults = 0, hasMore, nextOffset } = data
    ? data.paginatedCollection
    : {};

  const formattedCards = unifyCardFormat(cards);

  const onLoadMore = () =>
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

  return (
    <CardListMobile
      hasMore={hasMore}
      loading={loading}
      cards={formattedCards}
      onLoadMore={onLoadMore}
      totalResults={totalResults}
    />
  );
};
