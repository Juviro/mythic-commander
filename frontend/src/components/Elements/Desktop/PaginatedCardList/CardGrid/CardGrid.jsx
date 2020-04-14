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

export default ({ cards, loading, widthOffset, numberOfCards }) => {
  useWindowSize();
  const [showDetails, toggleShowDetail] = useToggle(false);

  const { cardsPerRow, numberOfRows } = getNumberOfCards(widthOffset);

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(
    cardsPerRow,
    numberOfRows,
    toggleShowDetail,
    numberOfCards
  );

  const selectedCard = cards[selectedElementPosition - 1];

  if (loading) return <Spin />;

  const onClick = index => {
    toggleShowDetail(true);
    setSelectedElementPosition(index + 1);
  };

  return (
    <>
      <StyledWrapper>
        {cards.map((card, index) => (
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
