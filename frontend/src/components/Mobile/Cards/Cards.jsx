import React, { useContext, useState } from 'react';
import { List, Button } from 'antd';
import styled from 'styled-components';

import { useQueryParams, StringParam } from 'use-query-params';
import CardContext from '../../CardProvider/CardProvider';
import { filterCards } from '../../Elements/SearchField/filterNames';
import Card from '../Collection/Card';

const CARDS_PER_PAGE = 20;

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 24px 0;
  justify-content: center;
`;

export default () => {
  const { cards } = useContext(CardContext);
  const [{ query: searchQuery = '' }] = useQueryParams({
    query: StringParam,
  });
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const filteredCards = filterCards(cards, searchQuery).slice(
    0,
    numberOfDisplayedCards
  );

  return (
    <List
      loadMore={
        <StyledButtonWrapper>
          <Button type="primary" onClick={onLoadMore}>
            Load more
          </Button>
        </StyledButtonWrapper>
      }
      dataSource={filteredCards}
      style={{ width: '100%' }}
      renderItem={card => <Card card={card} />}
    />
  );
};
