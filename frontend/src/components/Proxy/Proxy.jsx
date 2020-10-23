import React, { useState, useEffect } from 'react';
import { Spin, Empty } from 'antd';
import styled from 'styled-components';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router';
import { useQueryParam, StringParam } from 'use-query-params';

import { proxies } from './queries';
import { Flex } from '../Elements/Shared';
import { getImageUrl } from '../../utils/cardImage';

const StyledCardWrapper = styled.div`
  margin: -1px;
  height: 332px;
  width: 238px;
  padding: 1px;
  border: 1px solid rgb(0, 0, 0, 0.85);
  float: left;
  position: relative;
`;

const StyledCard = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  color: #6f0000;
  display: flex;
  justify-content: center;
  font-size: 120px;
  opacity: 0;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
  @media print {
    display: none;
  }
`;

export default () => {
  const { type, id } = useParams();
  const [filter] = useQueryParam('filter', StringParam);
  const [displayedCards, setDisplayedCards] = useState(null);

  const { data, loading } = useQuery(proxies, {
    variables: { id, type, filter },
  });

  useEffect(() => {
    if (!data || displayedCards) return;
    const spreadCards = [];
    data.proxies.forEach((card) => {
      for (let i = 0; i < card.amount; i++) {
        spreadCards.push(card);
      }
    });

    setDisplayedCards(spreadCards.map((card, key) => ({ key, ...card })));
    // eslint-disable-next-line
  }, [data]);

  const onRemoveCard = (key) => {
    setDisplayedCards(displayedCards.filter((card) => card.key !== key));
  };

  if (loading || !displayedCards) {
    return (
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Spin />
      </Flex>
    );
  }
  if (!displayedCards.length) {
    return (
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        <Empty description="No cards" />
      </Flex>
    );
  }

  return (
    <>
      {displayedCards.map(({ id: cardId, imgKey, key }) => (
        <StyledCardWrapper key={key} onClick={() => onRemoveCard(key)}>
          <StyledOverlay>X</StyledOverlay>
          <StyledCard src={getImageUrl(cardId, imgKey, 'normal')} />
        </StyledCardWrapper>
      ))}
    </>
  );
};
