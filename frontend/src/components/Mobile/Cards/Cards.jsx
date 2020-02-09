import React, { useContext, useState } from 'react';
import { List, Button } from 'antd';
import styled from 'styled-components';
import { useQueryParams, StringParam, BooleanParam } from 'use-query-params';

import { useQuery } from 'react-apollo';
import CardContext from '../../CardProvider/CardProvider';
import { filterCards } from '../../Elements/SearchField/filterNames';
import Card from './Card';
import { getCollection } from '../../../queries';

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
  const { data, loading: collectionLoading } = useQuery(getCollection);
  const [{ query: searchQuery = '', owned }] = useQueryParams({
    query: StringParam,
    owned: BooleanParam,
  });
  const [numberOfDisplayedCards, setNumberOfDisplayedCards] = useState(
    CARDS_PER_PAGE
  );
  const collection = (data && data.collection && data.collection.cards) || [];

  const onLoadMore = () => {
    setNumberOfDisplayedCards(numberOfDisplayedCards + CARDS_PER_PAGE);
  };

  const filteredCards = [];
  // TODO: solve more elegant
  let showMoreButton = false;

  filterCards(cards, searchQuery).some(card => {
    if (filteredCards.length === numberOfDisplayedCards) {
      showMoreButton = true;
      return true;
    }
    const cardWithOwned = {
      ...card,
      owned: collection.some(({ name }) => name === card.name),
    };
    if (owned === true) {
      if (cardWithOwned.owned) filteredCards.push(cardWithOwned);
    } else if (owned === false) {
      if (!collection.length && collectionLoading) return true;
      if (!cardWithOwned.owned) filteredCards.push(cardWithOwned);
    } else {
      filteredCards.push(cardWithOwned);
    }

    return false;
  });

  return (
    <List
      loading={collectionLoading && typeof owned === 'boolean'}
      loadMore={
        showMoreButton && (
          <StyledButtonWrapper>
            <Button type="primary" onClick={onLoadMore}>
              Load more
            </Button>
          </StyledButtonWrapper>
        )
      }
      dataSource={filteredCards}
      style={{ width: '100%' }}
      renderItem={card => <Card card={card} />}
    />
  );
};
