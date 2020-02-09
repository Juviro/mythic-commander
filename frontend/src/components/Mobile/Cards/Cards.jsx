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
  let showMoreButton = false;

  filterCards(cards, searchQuery).some(card => {
    let shouldInclude = false;
    const cardWithOwned = {
      ...card,
      owned: collection.some(({ name }) => name === card.name),
    };
    if (owned === true) {
      if (cardWithOwned.owned) shouldInclude = true;
    } else if (owned === false) {
      if (!collection.length && collectionLoading) return true;
      if (!cardWithOwned.owned) shouldInclude = true;
    } else {
      shouldInclude = true;
    }

    if (shouldInclude) {
      if (filteredCards.length === numberOfDisplayedCards) {
        showMoreButton = true;
        return true;
      }
      filteredCards.push(cardWithOwned);
    }
    return false;
  });

  return (
    <List
      loading={
        collectionLoading && typeof owned === 'boolean' && !collection.length
      }
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
