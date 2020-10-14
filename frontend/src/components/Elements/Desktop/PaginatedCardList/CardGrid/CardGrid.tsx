import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { MenuItem } from 'components/Elements/Shared/ContextMenu/ContextMenu';
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

export interface DragProps {
  canDrag: boolean;
  listId?: string;
  onSuccessfullDrop?: (card: UnifiedCard) => void;
}

interface Props {
  cards: UnifiedCard[];
  loading?: boolean;
  cardsPerRow?: number;
  cardWidth?: number;
  numberOfCards?: number;
  zoom?: number;
  search?: string;
  actions?: MenuItem[];
  onEditCard?: (card: UnifiedCard) => void;
  onDeleteCard?: (card: UnifiedCard) => void;
  onEnter?: (card: UnifiedCard) => void;
  markAsDisabled?: (card: UnifiedCard) => boolean;
  blockShortcuts?: boolean;
  hidePagination?: boolean;
  dragProps?: DragProps;
}

type PropsWithRouter = RouteComponentProps & Props;

const CardGrid = ({
  cards,
  loading = false,
  cardsPerRow,
  cardWidth,
  numberOfCards,
  zoom = 100,
  search,
  actions,
  onEditCard,
  onDeleteCard,
  history,
  onEnter,
  blockShortcuts,
  markAsDisabled,
  hidePagination,
  dragProps,
}: PropsWithRouter) => {
  const [showDetails, toggleShowDetail] = useToggle(false);

  const combinedNumberOfCards = numberOfCards || cards?.length || 0;

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(
    cardsPerRow,
    toggleShowDetail,
    combinedNumberOfCards,
    blockShortcuts
  );

  const selectedCard = cards[selectedElementPosition - 1];
  useShortcut('ENTER', onEnter && selectedCard ? () => onEnter(selectedCard) : null, [
    'modal.cardDetails',
    'deck.sidebar.add',
    'deck.sidebar.wants',
  ]);

  const onClick = (index: number) => {
    toggleShowDetail(true);
    setSelectedElementPosition(index + 1);
  };

  // close modal when list changes
  useEffect(() => {
    toggleShowDetail(false);
    setSelectedElementPosition(1);
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const showPagination = Boolean(cards.length) && !hidePagination;
  const paginationComponent = showPagination ? (
    <Pagination
      {...pagination}
      showSizeChanger
      size="small"
      showTotal={(total, [from, to]) => `${from}-${to} of ${total} cards`}
      style={{ alignSelf: 'flex-end', margin: '16px 0' }}
    />
  ) : null;

  return (
    <>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        style={{ width: '100%' }}
      >
        <span>{loading && <LoadingOutlined style={{ marginLeft: 16 }} />}</span>
        {paginationComponent}
      </Flex>
      <StyledWrapper>
        {cards.map((card, index) => {
          const isSelected = index + 1 === selectedElementPosition;

          return (
            <GridCard
              card={card}
              zoom={zoom}
              dragProps={dragProps}
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
      {paginationComponent}
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
