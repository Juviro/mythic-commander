import React, { useEffect, useRef, useState } from 'react';
import { Alert, Divider, Empty, Pagination, Typography } from 'antd';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';
import { EditOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons';

import { MenuItem } from 'components/Elements/Shared/ContextMenu/ContextMenu';
import { useSelectCards } from 'components/Elements/Shared/CardGrid/useSelectCards';
import isMobile from 'utils/isMobile';
import CustomSkeleton from '../CustomSkeleton';
import usePagination from './usePagination';
import CardModalDesktop from '../../Desktop/CardModalDesktop';
import Flex from '../Flex';
import GridCard from './GridCard';
import WithActions from './WithActions';
import { SelectionMenu } from './SelectionMenu/SelectionMenu';
import useCardDetailNavigation from './useCardDetailNavigation';
import GridListSelection from './GridListSelection/GridListSelection';
import scrollIntoView from '../../../../utils/scrollIntoView';
import { GridCard as GridCardType } from './cardgrid.types';

export const GRID_CARD_WIDTH = 220;

export const StyledCardGridWrapper = styled.div<{ cardsPerRow?: number }>`
  display: grid;
  grid-template-columns: ${({ cardsPerRow }) =>
    cardsPerRow
      ? `repeat(${cardsPerRow}, minmax(0, 1fr))`
      : `repeat(auto-fill, minmax(${GRID_CARD_WIDTH}px, 1fr))`};
  grid-gap: 16px;
  padding-top: 8px;
  width: 100%;
  align-self: center;
`;

export interface DragProps {
  canDrag: boolean;
  listId?: string;
  onSuccessfullDrop?: (card: GridCardType) => void;
}

export interface CardList {
  title?: React.ReactNode;
  key: string;
  color?: string;
  type?: string;
  cards: GridCardType[];
  additionalElements?: React.ReactNode;
  additionalActions?: MenuItem[];
  onChangeAmount?: (cardId: string, amount: number) => void;
}

interface Props {
  cards?: GridCardType[];
  loading?: boolean;
  error?: string;
  title?: string;
  numberOfCards?: number;
  search?: string;
  actions?: MenuItem[];
  onEditCard?: (card: GridCardType) => void;
  markAsDisabled?: (card: GridCardType) => boolean;
  onOpenDetails?: (card: GridCardType) => void;
  onMoveCards?: (cards: GridCardType[]) => void;
  onCopyCardsTo?: (cards: GridCardType[]) => void;
  onDeleteCards?: (cards: GridCardType[]) => void;
  onSetTags?: (cardId: string, tags: string[]) => void;
  hidePagination?: boolean;
  dragProps?: DragProps;
  cardsPerRow?: number;
  cardLists?: CardList[];
  disableSelection?: boolean;
  minimal?: boolean;
  onZoomIn?: (card: GridCardType) => void;
  onClickCard?: (card: GridCardType) => void;
  smallSelectionMenu?: boolean;
  allTags?: string[];
  hidePrices?: boolean;
  initialSelection?: string[];
  onSelectCards?: (cardIds: string[]) => void;
  hideSelectionNavigation?: boolean;
}

type PropsWithRouterProps = RouteComponentProps & Props;

const CardGrid = ({
  cards,
  title,
  loading = false,
  error,
  numberOfCards,
  search,
  onEditCard,
  onDeleteCards,
  history,
  markAsDisabled,
  dragProps,
  onOpenDetails,
  cardsPerRow,
  onMoveCards,
  onCopyCardsTo,
  onSetTags,
  cardLists: passedCardLists,
  onZoomIn,
  onClickCard,
  disableSelection,
  hidePagination,
  minimal,
  smallSelectionMenu,
  allTags,
  hidePrices,
  initialSelection,
  hideSelectionNavigation,
  onSelectCards,
}: PropsWithRouterProps) => {
  const [detailCardIndex, setDetailCardIndex] = useState<number | null>(null);
  const detailCard = cards?.[detailCardIndex];
  const { selectedCardIds, onSelectCard, onClearSelection, onSelectAll, canSelectAll } =
    useSelectCards({ cards, initialSelection, onSelectCards });

  const cardRefs = useRef<Record<string, HTMLDivElement>>({});

  const setDetailCard = (card: GridCardType) => {
    const cardIndex = cards.findIndex(({ id }) => id === card.id);
    setDetailCardIndex(cardIndex);
  };

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const combinedNumberOfCards = numberOfCards || cards?.length || 0;

  const pagination = usePagination(combinedNumberOfCards, wrapperRef, hidePagination);
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

  useEffect(() => {
    const cardElement = cardRefs.current[detailCard?.id];
    if (!cardElement) return;

    scrollIntoView(cardElement, {
      behavior: 'smooth',
    });
  }, [detailCard?.id]);

  const showPagination = Boolean(cards?.length) && !hidePagination && !minimal;
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
      onClick: (card: GridCardType) => onDeleteCards([card]),
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

  if (error) {
    return (
      <Alert
        style={{
          alignSelf: 'center',
          margin: 64,
        }}
        message={error}
        type="error"
      />
    );
  }

  if (loading && detailCardIndex === null) {
    return (
      <CustomSkeleton.Grid
        cardsPerRow={cardsPerRow}
        showPagination={!hidePagination && !minimal}
        numberOfElements={hidePagination ? 20 : pagination.pageSize}
      />
    );
  }

  if (!cards?.length && !passedCardLists?.length) {
    return <Empty description="This list is empty" style={{ marginTop: 48 }} />;
  }

  return (
    <>
      {!hideSelectionNavigation && (
        <SelectionMenu
          allTags={allTags}
          allCards={cards}
          onClearSelection={onClearSelection}
          selectedCardIds={selectedCardIds}
          onMoveCards={onMoveSelectedCards}
          onDeleteCards={onDeleteSelectedCards}
          onCopyCardsTo={onCopySelectedCardsTo}
          onSelectAll={onSelectAll}
          canSelectAll={canSelectAll}
          smallSelectionMenu={smallSelectionMenu}
        />
      )}
      {!isMobile() && !minimal && <GridListSelection cardLists={cardLists} />}
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
        <React.Fragment key={list.key}>
          {Boolean(index) && <Divider style={{ marginBottom: '0px !important' }} />}
          {list.title && (
            <Typography.Title level={4} style={{ marginTop: 0 }}>
              {list.title}
            </Typography.Title>
          )}
          <StyledCardGridWrapper cardsPerRow={cardsPerRow} id={list.key}>
            {list.cards?.map((card) => (
              <GridCard
                card={card}
                onChangeAmount={list.onChangeAmount}
                onClick={onClickCard}
                dragProps={dragProps}
                key={card.id}
                cardRef={(ref) => {
                  cardRefs.current[card.id] = ref;
                }}
                actions={[...actions, ...(list.additionalActions ?? [])]}
                search={search}
                minimal={minimal}
                hidePrices={hidePrices}
                disableSelection={disableSelection || minimal}
                fixedSize={!cardsPerRow}
                allTags={allTags}
                onSetTags={onSetTags}
                isSelected={selectedCardIds.includes(card.id)}
                isAnyCardSelected={Boolean(selectedCardIds.length)}
                onZoomIn={onZoomIn}
                onSelect={() => onSelectCard(card.id)}
                markAsDisabled={markAsDisabled && markAsDisabled(card)}
                onOpenDetails={() =>
                  onOpenDetails ? onOpenDetails(card) : setDetailCard(card)
                }
              />
            ))}
            {list.additionalElements}
          </StyledCardGridWrapper>
        </React.Fragment>
      ))}
      {paginationComponent}
      <CardModalDesktop
        loading={loading}
        selectedCard={detailCard}
        visible={detailCardIndex !== null}
        onClose={() => setDetailCardIndex(null)}
        {...cardDetailNavigation}
      />
    </>
  );
};

interface FullProps extends Props {
  deleteByOracle?: (oracleIds: string[], numberOfCards: number) => void;
  allowSettingDefaultCardVersion?: boolean;
}

const CardGridWithActions = ({
  deleteByOracle,
  onEditCard,
  allowSettingDefaultCardVersion,
  ...props
}: FullProps & RouteComponentProps) => (
  <WithActions
    deleteByOracle={deleteByOracle}
    onEditCard={onEditCard}
    allowSettingDefaultCardVersion={allowSettingDefaultCardVersion}
  >
    {(actionProps) => <CardGrid {...props} {...actionProps} />}
  </WithActions>
);

export default withRouter(CardGridWithActions);
