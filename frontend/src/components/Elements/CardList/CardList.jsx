import React, { useState } from 'react';
import { List, Button, Typography } from 'antd';
import styled from 'styled-components';

import CardListItem from './CardListItem';
import CustomSkeleton from '../CustomSkeleton';

const CARDS_PER_PAGE = 50;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 24px 0;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({ cards }) => {
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );

  if (!cards) {
    return <CustomSkeleton.List />;
  }

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const showMoreButton = numberOfDisplayedCards < cards.length;

  const displayedCards = cards.slice(0, numberOfDisplayedCards);

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
            >{`Displaying ${numberOfDisplayedCards} of ${cards.length} cards`}</Typography.Text>
          </StyledButtonWrapper>
        )
      }
      size="small"
      dataSource={displayedCards}
      style={{ width: '100%', margin: 8 }}
      renderItem={card => <CardListItem card={card} />}
    />
  );
};
