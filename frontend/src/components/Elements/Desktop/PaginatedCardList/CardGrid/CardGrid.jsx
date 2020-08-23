import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';

import { withRouter } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import GridCard from './GridCard';
import useGridShortcuts from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import { useToggle, useShortcut } from '../../../../Hooks';
import { Flex } from '../../../Shared';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 8px;
  width: 100%;
  align-self: center;
`;

const CardGrid = ({
  cards,
  loading,
  cardsPerRow,
  cardWidth,
  numberOfCards,
  zoom = 100,
  search,
  actions,
  onEditCard,
  onDeleteCard,
  history,
  blockShortcuts,
  onEnter,
  draggable,
  markAsDisabled,
}) => {
  const [showDetails, toggleShowDetail] = useToggle(false);

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(cardsPerRow, toggleShowDetail, numberOfCards, blockShortcuts);

  const selectedCard = cards[selectedElementPosition - 1];
  useShortcut('ENTER', onEnter && selectedCard ? () => onEnter(selectedCard) : null, [
    'modal.cardDetails',
    'deck.sidebar.add',
  ]);

  const onClick = (index) => {
    toggleShowDetail(true);
    setSelectedElementPosition(index + 1);
  };

  // close modal when list changes
  useEffect(() => {
    toggleShowDetail(false);
    setSelectedElementPosition(1);
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const paginationComponent = (
    <Pagination
      {...pagination}
      showSizeChanger
      size="small"
      showTotal={(total, [from, to]) => `${from}-${to} of ${total} cards`}
      style={{ alignSelf: 'flex-end', margin: '16px 0' }}
    />
  );

  return (
    <>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        style={{ width: '100%' }}
      >
        <span>{loading && <LoadingOutlined style={{ marginLeft: 16 }} />}</span>
        {Boolean(cards.length) && paginationComponent}
      </Flex>
      <StyledWrapper>
        {cards.map((card, index) => {
          const isSelected = index + 1 === selectedElementPosition;

          return (
            <GridCard
              card={card}
              zoom={zoom}
              draggable={draggable}
              key={card.id}
              actions={actions}
              width={cardWidth}
              index={index}
              search={search}
              markAsDisabled={markAsDisabled && markAsDisabled(card)}
              shortcutsActive={isSelected && !showDetails}
              onEditCard={onEditCard ? () => onEditCard(card) : undefined}
              onDeleteCard={onDeleteCard ? () => onDeleteCard(card) : undefined}
              onClick={() => onClick(index)}
              widthPercentage={100 / cardsPerRow}
              isSelected={isSelected}
            />
          );
        })}
      </StyledWrapper>
      {Boolean(cards.length) && paginationComponent}
      <CardModalDesktop
        loading={loading}
        selectedCard={selectedCard}
        visible={showDetails}
        onClose={() => toggleShowDetail(false)}
      />
    </>
  );
};

export default withRouter(CardGrid);
