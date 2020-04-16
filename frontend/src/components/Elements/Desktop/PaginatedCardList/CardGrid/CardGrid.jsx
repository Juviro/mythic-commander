import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

import useGridShortcuts from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import GridCard from './GridCard';
import useNumberOfCards from './useNumberOfCards';
import { useWindowSize, useToggle } from '../../../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 8px;
  width: 100%;
  align-self: center;
  max-height: 100%;
  overflow-y: auto;
`;

export default ({ cards, loading, widthOffset, numberOfCards }) => {
  useWindowSize();
  const [showDetails, toggleShowDetail] = useToggle(false);

  const { cardsPerRow, numberOfRows, cardWidth } = useNumberOfCards(
    widthOffset
  );

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
            loading={loading}
            key={card.id}
            onClick={() => onClick(index)}
            width={cardWidth}
            widthPercentage={100 / cardsPerRow}
            isSelected={index + 1 === selectedElementPosition}
          />
        ))}
      </StyledWrapper>
      <Pagination
        {...pagination}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} cards`
        }
        style={{ alignSelf: 'flex-end', margin: '16px 0' }}
      />
      <CardModalDesktop
        loading={loading}
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};
