import React, { useState } from 'react';
import { List, Button, Typography } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';
import {
  filterCards,
  sortCardsBySearch,
  sortByCmc,
  sortByName,
  sortByPrice,
} from '../../../utils/cardFilter';
import GridCard from './GridCard';

const CARDS_PER_PAGE = 30;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const StyledGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ShowMoreButton = ({
  canLoadMore,
  onLoadMore,
  numberOfDisplayedCards,
  totalCards,
}) => (
  <StyledButtonWrapper>
    {canLoadMore && (
      <Button type="link" onClick={onLoadMore}>
        Load more
      </Button>
    )}
    <Typography.Text
      style={{ marginTop: 8 }}
      type="secondary"
    >{`Displaying ${numberOfDisplayedCards} of ${totalCards} cards`}</Typography.Text>
  </StyledButtonWrapper>
);

const sortCards = (cards, orderBy = '', searchString) => {
  const [order, direction = 'asc'] = orderBy.split('-');
  switch (order) {
    case 'search':
      return cards.sort(sortCardsBySearch(searchString));
    case 'cmc':
      return sortByCmc(cards, direction);
    case 'name':
      return sortByName(cards, direction);
    case 'price':
      return sortByPrice(cards, direction);
    default:
      return cards;
  }
};

export default ({ cards, filterByQuery, loading }) => {
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );
  const [
    {
      search,
      colors,
      query,
      creatureType,
      cardType,
      isLegendary,
      layout = 'list',
      orderBy = 'name-asc',
    },
  ] = useQueryParams({
    search: StringParam,
    query: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
    layout: StringParam,
    orderBy: StringParam,
  });

  console.log('cards :', cards);
  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const searchString = filterByQuery ? query : search;

  const filteredCards = filterCards(cards, {
    colors,
    search: searchString,
    creatureType,
    cardType,
    isLegendary,
  });

  const sortedCards = sortCards(filteredCards, orderBy, searchString);

  const canLoadMore = numberOfDisplayedCards < sortedCards.length;

  const displayedCards = sortedCards.slice(0, numberOfDisplayedCards);

  const showMoreButton = (
    <ShowMoreButton
      canLoadMore={canLoadMore}
      totalCards={filteredCards.length}
      numberOfDisplayedCards={displayedCards.length}
      onLoadMore={onLoadMore}
    />
  );

  if (layout === 'list') {
    return (
      <List
        loading={loading}
        loadMore={showMoreButton}
        size="small"
        dataSource={displayedCards}
        style={{ width: '100%', margin: 8 }}
        renderItem={card => (
          <CardListItem card={card} searchString={searchString} />
        )}
      />
    );
  }

  return (
    <StyledGridWrapper>
      {displayedCards.map(card => (
        <GridCard
          key={card.id}
          card={card}
          isLarge={layout !== 'grid'}
          searchString={searchString}
        />
      ))}
      {showMoreButton}
    </StyledGridWrapper>
  );
};
