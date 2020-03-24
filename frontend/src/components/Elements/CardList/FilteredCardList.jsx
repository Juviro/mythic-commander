import React, { useState, useEffect } from 'react';

import { useQueryParams, StringParam } from 'use-query-params';
import CustomSkeleton from '../CustomSkeleton';
import {
  filterCards,
  sortByCmc,
  sortByName,
  sortByPrice,
  sortByAdded,
  sortByAmount,
} from '../../../utils/cardFilter';
import CardList from '.';

export const CARDS_PER_PAGE = 30;

const sortCards = (cards, orderBy = '') => {
  const [order, direction = 'asc'] = orderBy.split('-');
  switch (order) {
    case 'cmc':
      return sortByCmc(cards, direction);
    case 'added':
      return sortByAdded(cards, direction);
    case 'name':
      return sortByName(cards, direction);
    case 'price':
      return sortByPrice(cards, direction);
    case 'amount':
      return sortByAmount(cards, direction);
    default:
      return cards;
  }
};

export default ({
  cards,
  loading,
  basePath,
  onDeleteElement,
  isEditing,
  onChangeAmount,
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

  const sortedCards = sortCards(filteredCards, orderBy, name);

  const hasMore = displayedResults < sortedCards.length;

  const displayedCards = sortedCards.slice(0, displayedResults);

  return (
    <CardList
      isEditing={isEditing}
      basePath={basePath}
      hasMore={hasMore}
      loading={loading}
      onChangeAmount={onChangeAmount}
      cards={displayedCards}
      onLoadMore={onLoadMore}
      onDeleteElement={onDeleteElement}
      totalResults={cards.length}
    />
  );
};
