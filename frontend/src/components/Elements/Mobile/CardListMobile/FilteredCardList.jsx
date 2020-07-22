import React, { useState, useEffect } from 'react';

import { useQueryParams, StringParam } from 'use-query-params';
import CustomSkeleton from '../../Shared/CustomSkeleton';
import { filterCards, sortCards } from '../../../../utils/cardFilter';
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
  name: nameQuery,
}) => {
  const [{ name, colors, layout, creatureType, cardType, isLegendary }] = useQueryParams({
    name: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    layout: StringParam,
  });
  const [orderBy = 'added-desc'] = useStoredQueryParam('orderByAdvanced', StringParam);

  const [displayedResults, setDisplayedResults] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    setDisplayedResults(CARDS_PER_PAGE);
    // eslint-disable-next-line
  }, [layout]);

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onLoadMore = () => {
    setDisplayedResults(displayedResults + CARDS_PER_PAGE);
  };

  const filteredCards = filterCards(cards, {
    colors,
    name: name || nameQuery,
    creatureType,
    cardType,
    isLegendary,
  });

  const sortedCards = sortCards(filteredCards, orderBy);

  const hasMore = displayedResults < sortedCards.length;

  const displayedCards = sortedCards.slice(0, displayedResults);

  return (
    <CardList
      moveToList={moveToList}
      hideFooter={hideFooter}
      hasMore={hasMore}
      loading={loading}
      cards={displayedCards}
      onLoadMore={onLoadMore}
      onEditCard={onEditCard}
      onDeleteCard={onDeleteCard}
      totalResults={cards.length}
    />
  );
};
