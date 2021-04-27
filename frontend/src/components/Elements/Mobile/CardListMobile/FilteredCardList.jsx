import React, { useState, useEffect } from 'react';

import { useQueryParams, StringParam } from 'use-query-params';
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
  deleteByOracle,
}) => {
  const [{ name, colors, layout, subType, cardType, isLegendary }] = useQueryParams({
    name: StringParam,
    colors: StringParam,
    subType: StringParam,
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

  const onLoadMore = () => {
    setDisplayedResults(displayedResults + CARDS_PER_PAGE);
  };

  const filteredCards =
    cards &&
    filterCards(cards, {
      colors,
      name: name || nameQuery,
      subType,
      cardType,
      isLegendary,
    });

  const sortedCards = cards && sortCards(filteredCards, orderBy);

  const hasMore = displayedResults < sortedCards?.length;

  const displayedCards = sortedCards?.slice(0, displayedResults);

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
      totalResults={cards?.length}
    />
  );
};
