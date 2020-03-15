import React, { useState } from 'react';
import { List, Button, Typography } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';
import { filterCards, sortCardsBySearch } from '../../../utils/cardFilter';

const CARDS_PER_PAGE = 50;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const sortCards = (cards, sortBy, searchString) => {
  switch (sortBy) {
    case 'search':
      return cards.sort(sortCardsBySearch(searchString));
    default:
      return cards;
  }
};

export default ({ cards, filterByQuery, loading }) => {
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );
  const [{ search, colors, query, sortBy }] = useQueryParams({
    search: StringParam,
    query: StringParam,
    colors: StringParam,
    sortBy: StringParam,
  });

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const searchString = filterByQuery ? query : search;

  const filteredCards = filterCards(cards, { colors, search: searchString });

  const sortedCards = sortCards(filteredCards, sortBy, searchString);

  const showMoreButton = numberOfDisplayedCards < sortedCards.length;

  const displayedCards = sortedCards.slice(0, numberOfDisplayedCards);

  return (
    <List
      loading={loading}
      loadMore={
        showMoreButton && (
          <StyledButtonWrapper>
            <Button type="link" onClick={onLoadMore}>
              Load more
            </Button>
            <Typography.Text
              style={{ marginTop: 8 }}
              type="secondary"
            >{`Displaying ${numberOfDisplayedCards} of ${filteredCards.length} cards`}</Typography.Text>
          </StyledButtonWrapper>
        )
      }
      size="small"
      dataSource={displayedCards}
      style={{ width: '100%', margin: 8 }}
      renderItem={card => (
        <CardListItem card={card} searchString={searchString} />
      )}
    />
  );
};
