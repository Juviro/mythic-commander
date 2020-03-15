import React, { useState } from 'react';
import { List, Button, Typography } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';
import { filterCards } from '../../../utils/cardFilter';

const CARDS_PER_PAGE = 50;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({ cards }) => {
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );
  const [filter] = useQueryParams({
    search: StringParam,
    colors: StringParam,
  });

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const filteredCards = filterCards(cards, filter);

  const showMoreButton = numberOfDisplayedCards < filteredCards.length;

  const displayedCards = filteredCards.slice(0, numberOfDisplayedCards);

  return (
    <List
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
        <CardListItem card={card} searchString={filter.search} />
      )}
    />
  );
};
