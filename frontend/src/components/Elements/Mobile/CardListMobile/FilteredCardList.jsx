import React, { useState, useEffect } from 'react';

import { StringParam, useQueryParam } from 'use-query-params';
import { sortCards } from '../../../../utils/cardFilter';
import CardList from '.';
import { useStoredQueryParam } from '../../../Hooks';

export const CARDS_PER_PAGE = 30;

export default ({
  cards,
  loading,
  hideFooter,
  onDeleteCard,
  onEditCard,
  moveToList,
  deleteByOracle,
  paginated = true,
  disableSelection,
}) => {
  const [layout] = useQueryParam('layout', StringParam);
  const [orderBy = 'added-desc'] = useStoredQueryParam('orderByAdvanced', StringParam);

  const [displayedResults, setDisplayedResults] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    setDisplayedResults(CARDS_PER_PAGE);
    // eslint-disable-next-line
  }, [layout]);

  const onLoadMore = () => {
    setDisplayedResults(displayedResults + CARDS_PER_PAGE);
  };

  const sortedCards = cards && sortCards(cards, orderBy);

  const hasMore = displayedResults < sortedCards?.length;

  const displayedCards = paginated
    ? sortedCards?.slice(0, displayedResults)
    : sortedCards;

  return (
    <CardList
      moveToList={moveToList}
      hideFooter={hideFooter}
      hasMore={hasMore}
      loading={loading}
      deleteByOracle={deleteByOracle}
      cards={displayedCards}
      onLoadMore={onLoadMore}
      onEditCard={onEditCard}
      onDeleteCard={onDeleteCard}
      disableSelection={disableSelection}
      totalResults={cards?.length}
    />
  );
};
