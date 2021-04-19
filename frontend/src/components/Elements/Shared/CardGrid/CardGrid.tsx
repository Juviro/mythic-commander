import React, { useEffect, useRef, useState } from 'react';
import { Divider, Pagination, Typography } from 'antd';
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
import useCardDetailNavigation from './useCardDetailNavigation';

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

interface CardList {
  title?: string;
  key?: string;
  cards: UnifiedCard[];
}

interface Props {
  cards?: UnifiedCard[];
  loading?: boolean;
  title?: string;
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
  cardLists?: CardList[];
}

type PropsWithRouterProps = RouteComponentProps & Props;

const CardGrid = ({
  cards,
  title,
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
  cardLists: passedCardLists,
}: PropsWithRouterProps) => {
  const [detailCardIndex, setDetailCardIndex] = useState<number | null>(null);
  const detailCard = cards?.[detailCardIndex];
  const {
    selectedCardIds,
    onSelectCard,
    onClearSelection,
    onSelectAll,
    canSelectAll,
  } = useSelectCards(cards);

  const setDetailCard = (card: UnifiedCard) => {
    const cardIndex = cards.findIndex(({ id }) => id === card.id);
    setDetailCardIndex(cardIndex);
  };

  const wrapperRef = useRef(null);

  const combinedNumberOfCards = numberOfCards || cards?.length || 0;

  const pagination = usePagination(combinedNumberOfCards);
  const cardDetailNavigation = useCardDetailNavigation({
    detailCardIndex,
    setDetailCardIndex,
    cards,
    pagination,
  });

  // close modal when list changes
  useEffect(() => {
    setDetailCardIndex(null);
    // eslint-disable-next-line
  }, [history.location.pathname]);

  const showPagination = Boolean(cards?.length) && !hidePagination;
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

  const cardLists = passedCardLists ?? [{ title, key: 'main', cards }];

  return (
    <>
      <SelectionMenu
        onClearSelection={onClearSelection}
        selectedCardIds={selectedCardIds}
        onMoveCards={onMoveSelectedCards}
        onDeleteCards={onDeleteSelectedCards}
        onCopyCardsTo={onCopySelectedCardsTo}
        onSelectAll={onSelectAll}
        canSelectAll={canSelectAll}
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
      {cardLists.map((list: CardList, index) => (
        <React.Fragment key={list.key ?? list.title}>
          {Boolean(index) && <Divider />}
          {list.title && <Typography.Title level={4}>{list.title}</Typography.Title>}
          <StyledCardGridWrapper itemsPerRow={itemsPerRow}>
            {list.cards?.map((card) => (
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
                  onOpenDetails ? onOpenDetails(card) : setDetailCard(card)
                }
              />
            ))}
          </StyledCardGridWrapper>
        </React.Fragment>
      ))}
      {paginationComponent}
      <CardModalDesktop
        loading={loading}
        selectedCard={detailCard}
        visible={Boolean(detailCard)}
        onClose={() => setDetailCardIndex(null)}
        {...cardDetailNavigation}
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
