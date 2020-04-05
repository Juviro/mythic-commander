import React, { useState, useEffect } from 'react';

import { useQueryParams, StringParam } from 'use-query-params';
import CustomSkeleton from '../CustomSkeleton';
import { filterCards, sortCards } from '../../../utils/cardFilter';
import CardList from '.';

export const CARDS_PER_PAGE = 30;

export default ({
  cards,
  loading,
  basePath,
  hideFooter,
  onDeleteCard,
  onEditCard,
}) => {
  const [
    {
      name,
      colors,
      layout,
      creatureType,
      cardType,
      isLegendary,
      orderBy = 'added-desc',
    },
  ] = useQueryParams({
    name: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    layout: StringParam,
    orderBy: StringParam,
  });

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
    name,
    creatureType,
    cardType,
    isLegendary,
  });

  const sortedCards = sortCards(filteredCards, orderBy);

  const hasMore = displayedResults < sortedCards.length;

  const displayedCards = sortedCards.slice(0, displayedResults);

  return (
    <CardList
      hideFooter={hideFooter}
      basePath={basePath}
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
