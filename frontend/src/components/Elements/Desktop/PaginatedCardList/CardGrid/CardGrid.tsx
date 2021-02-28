import React, { useEffect, useRef } from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { MenuItem } from 'components/Elements/Shared/ContextMenu/ContextMenu';
import GridCard from './GridCard';
import useGridShortcuts, { CARD_WIDTH } from './useGridShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import { useToggle, useShortcut } from '../../../../Hooks';
import { Flex } from '../../../Shared';

export const StyledCardGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${CARD_WIDTH}px, 1fr));
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
  numberOfCards?: number;
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

type PropsWithRouterProps = RouteComponentProps & Props;

const CardGrid = ({
  cards,
  loading = false,
  numberOfCards,
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
}: PropsWithRouterProps) => {
  const [showDetails, toggleShowDetail] = useToggle(false);

  const wrapperRef = useRef(null);

  const combinedNumberOfCards = numberOfCards || cards?.length || 0;

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useGridShortcuts(
    wrapperRef,
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
        ref={wrapperRef}
      >
        <span>{loading && <LoadingOutlined style={{ marginLeft: 16 }} />}</span>
        {paginationComponent}
      </Flex>
      <StyledCardGridWrapper>
        {cards.map((card, index) => {
          const isSelected = index + 1 === selectedElementPosition;

          return (
            <GridCard
              card={card}
              dragProps={dragProps}
              key={card.id}
              actions={actions}
              index={index}
              search={search}
              markAsDisabled={markAsDisabled && markAsDisabled(card)}
              shortcutsActive={isSelected && !showDetails}
              onEditCard={onEditCard ? () => onEditCard(card) : undefined}
              onDeleteCard={onDeleteCard ? () => onDeleteCard(card) : undefined}
              onClick={() => onClick(index)}
              isSelected={isSelected}
            />
          );
        })}
      </StyledCardGridWrapper>
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
