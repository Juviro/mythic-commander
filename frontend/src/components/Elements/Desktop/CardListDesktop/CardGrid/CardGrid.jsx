import React from 'react';
import { Spin, Pagination } from 'antd';
import { useQueryParam, StringParam } from 'use-query-params';
import styled from 'styled-components';

import { filterByName, sortCards } from '../../../../../utils/cardFilter';
import useGridShortcuts from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import GridCard from './GridCard';
import getNumberOfCards from './getNumberOfCards';
import { useWindowSize, usePreloadCards, useToggle } from '../../../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 8px;
`;

export default ({ cards, loading, widthOffset }) => {
  useWindowSize();
  const [orderBy] = useQueryParam('orderBy', StringParam);
  const [showDetails, toggleShowDetail] = useToggle(false);

  const [query] = useQueryParam('name', StringParam);
  const filteredCards = filterByName(cards, query);
  const sortedCards = sortCards(filteredCards, orderBy);
  const { cardsPerRow, numberOfRows } = getNumberOfCards(widthOffset);

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(
    cardsPerRow,
    numberOfRows,
    toggleShowDetail,
    sortedCards.length
  );

  const firstCard = pagination.pageSize * (pagination.current - 1);
  const currentCards = sortedCards.slice(
    firstCard,
    firstCard + pagination.pageSize
  );
  const selectedCard = currentCards[selectedElementPosition - 1];
  usePreloadCards(sortedCards, firstCard, pagination.pageSize);

  if (loading) return <Spin />;

  const onClick = index => {
    setSelectedElementPosition(index + 1);
    toggleShowDetail();
  };

  return (
    <>
      <StyledWrapper>
        {currentCards.map((card, index) => (
          <GridCard
            card={card}
            key={card.id}
            onClick={() => onClick(index)}
            widthPercentage={100 / cardsPerRow}
            isSelected={index + 1 === selectedElementPosition}
          />
        ))}
      </StyledWrapper>
      <Pagination
        {...pagination}
        showSizeChanger={false}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} cards`
        }
        style={{ alignSelf: 'flex-end', margin: '16px 0' }}
      />
      <CardModalDesktop
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};
