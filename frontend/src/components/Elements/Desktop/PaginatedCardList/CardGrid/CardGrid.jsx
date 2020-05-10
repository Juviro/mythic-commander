import React from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

import GridCard from './GridCard';
import useNumberOfCards from './useNumberOfCards';
import useGridShortcuts from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import { useWindowSize, useToggle } from '../../../../Hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 8px;
  width: 100%;
  align-self: center;
`;

export default ({
  cards,
  loading,
  widthOffset,
  numberOfCards,
  zoom,
  search,
  actions,
  onEditCard,
  onDeleteCard,
}) => {
  useWindowSize();
  const [showDetails, toggleShowDetail] = useToggle(false);

  const { cardsPerRow, numberOfRows, cardWidth } = useNumberOfCards(
    widthOffset,
    zoom
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

  const paginationComponent = (
    <Pagination
      {...pagination}
      showSizeChanger
      showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} cards`}
      style={{ alignSelf: 'flex-end', margin: '16px 0' }}
    />
  );

  return (
    <>
      {Boolean(cards.length) && paginationComponent}
      <StyledWrapper>
        {cards.map((card, index) => (
          <GridCard
            card={card}
            zoom={zoom}
            key={card.id}
            actions={actions}
            loading={loading}
            width={cardWidth}
            index={index}
            search={search}
            onEditCard={() => onEditCard(card)}
            onDeleteCard={() => onDeleteCard(card)}
            onClick={() => onClick(index)}
            widthPercentage={100 / cardsPerRow}
            isSelected={index + 1 === selectedElementPosition}
          />
        ))}
      </StyledWrapper>
      {Boolean(cards.length) && paginationComponent}
      <CardModalDesktop
        loading={loading}
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};
