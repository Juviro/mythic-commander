import React, { useEffect, useRef, useState } from 'react';
import { Pagination } from 'antd';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { EditOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';

import { UnifiedCard } from 'types/unifiedTypes';
import { MenuItem } from 'components/Elements/Shared/ContextMenu/ContextMenu';
import { useSelectCards } from 'components/Elements/Shared/CardGrid/useSelectCards';
import usePagination from './usePagination';
import CardModalDesktop from '../../Desktop/CardModalDesktop';
import { Flex } from '..';
import GridCard from './GridCard';
import WithActions from './WithActions';
import { SelectionMenu } from './SelectionMenu';

export const StyledCardGridWrapper = styled.div<{ itemsPerRow?: number }>`
  display: grid;
  grid-template-columns: ${({ itemsPerRow }) =>
    itemsPerRow
      ? `repeat(${itemsPerRow}, minmax(0, 1fr))`
      : 'repeat(auto-fill, minmax(220px, 1fr))'};
  grid-gap: 16px;
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
  markAsDisabled?: (card: UnifiedCard) => boolean;
  onOpenDetails?: (card: UnifiedCard) => void;
  onMoveCards?: (cards: UnifiedCard[]) => void;
  onCopyCardsTo?: (cards: UnifiedCard[]) => void;
  onDeleteCards?: (cards: UnifiedCard[]) => void;
  hidePagination?: boolean;
  dragProps?: DragProps;
  itemsPerRow?: number;
}

type PropsWithRouterProps = RouteComponentProps & Props;

const CardGrid = ({
  cards,
  loading = false,
  numberOfCards,
  search,
  onEditCard,
  onDeleteCards,
  history,
  markAsDisabled,
  hidePagination,
  dragProps,
  onOpenDetails,
  itemsPerRow,
  onMoveCards,
  onCopyCardsTo,
}: PropsWithRouterProps) => {
  const [detailCard, setDetailCard] = useState(null);
  const { selectedCardIds, onSelectCard, onClearSelection } = useSelectCards(cards);

  const wrapperRef = useRef(null);

  const combinedNumberOfCards = numberOfCards || cards?.length || 0;

  const pagination = usePagination(combinedNumberOfCards);

  const onOpenDetailsDesktop = (card: UnifiedCard) => {
    setDetailCard(card);
  };

  // close modal when list changes
  useEffect(() => {
    setDetailCard(false);
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

  const actions = [];
  if (onEditCard) {
    actions.push({
      title: 'Edit',
      Icon: EditOutlined,
      onClick: onEditCard,
    });
  }
  if (onDeleteCards) {
    actions.push({
      title: 'Delete',
      Icon: DeleteOutlined,
      onClick: (card: UnifiedCard) => onDeleteCards([card]),
    });
  }

  const getSelectedCards = () => cards.filter(({ id }) => selectedCardIds.includes(id));

  const onDeleteSelectedCards = onDeleteCards
    ? () => {
        const selectedCards = getSelectedCards();
        onDeleteCards(selectedCards);
      }
    : undefined;

  const onMoveSelectedCards = onMoveCards
    ? () => {
        const selectedCards = getSelectedCards();
        onMoveCards(selectedCards);
      }
    : undefined;

  const onCopySelectedCardsTo = onCopyCardsTo
    ? () => {
        const selectedCards = getSelectedCards();
        onCopyCardsTo(selectedCards);
      }
    : undefined;

  return (
    <>
      <SelectionMenu
        onClearSelection={onClearSelection}
        selectedCardIds={selectedCardIds}
        onMoveCards={onMoveSelectedCards}
        onDeleteCards={onDeleteSelectedCards}
        onCopyCardsTo={onCopySelectedCardsTo}
      />
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
      <StyledCardGridWrapper itemsPerRow={itemsPerRow}>
        {cards.map((card) => (
          <GridCard
            card={card}
            dragProps={dragProps}
            key={card.id}
            actions={actions}
            search={search}
            isSelected={selectedCardIds.includes(card.id)}
            isAnyCardSelected={Boolean(selectedCardIds.length)}
            canZoomIn={itemsPerRow === 2}
            onSelect={() => onSelectCard(card.id)}
            markAsDisabled={markAsDisabled && markAsDisabled(card)}
            onOpenDetails={() =>
              onOpenDetails ? onOpenDetails(card) : onOpenDetailsDesktop(card)
            }
          />
        ))}
      </StyledCardGridWrapper>
      {paginationComponent}
      <CardModalDesktop
        loading={loading}
        selectedCard={detailCard}
        visible={Boolean(detailCard)}
        onClose={() => setDetailCard(false)}
      />
    </>
  );
};

interface FullProps extends Props {
  deleteByOracle?: (oracleIds: string[], numberOfCards: number) => void;
}

const CardGridWithActions = ({
  deleteByOracle,
  onEditCard,
  ...props
}: FullProps & RouteComponentProps) => (
  <WithActions deleteByOracle={deleteByOracle} onEditCard={onEditCard}>
    {(actionProps) => <CardGrid {...props} {...actionProps} />}
  </WithActions>
);

export default withRouter(CardGridWithActions);
