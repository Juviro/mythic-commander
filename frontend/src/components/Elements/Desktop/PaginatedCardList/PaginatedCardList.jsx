import React from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

import styled from 'styled-components';
import { Empty, Typography } from 'antd';
import { DeleteOutlined, SendOutlined, EditOutlined } from '@ant-design/icons';
import Flex from '../../Shared/Flex';
import CardTable from './CardTable';
import CardGrid from './CardGrid';
import Header from './Header';
import FullscreenSpinner from '../../Shared/Spinner';
import useLocalStorage from '../../../Hooks/useLocalStorage';
import keySymbols from '../../../../constants/keySymbols';
import useNumberOfCards from './useNumberOfCards';

const StyledEmpty = styled(Empty)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default ({
  cards,
  loading,
  widthOffset,
  numberOfCards,
  showSorter,
  hiddenColumns,
  setSearch,
  search,
  showAddedBeforeFilter,
  showCollectionFilters,
  orderByParamName,
  setSelectedCards,
  onDeleteCards,
  selectedCards,
  title,
  onEditCard,
  onMoveCards,
}) => {
  const [zoom, setZoom] = useLocalStorage('zoom', 100);
  const [layout] = useQueryParam('layout', StringParam);
  const width = `calc(100% - ${widthOffset}px)`;

  const { cardsPerRow, numberOfRows, cardWidth } = useNumberOfCards(
    widthOffset,
    zoom
  );

  const heightOffset = title ? 40 : 0;

  const singleCardActions = [];
  const onEdit = onEditCard
    ? card => {
        setSelectedCards([card]);
        onEditCard();
      }
    : undefined;
  const onDelete = onDeleteCards
    ? card => {
        setSelectedCards([card]);
        onDeleteCards();
      }
    : undefined;
  if (onEditCard) {
    singleCardActions.push({
      title: 'Edit... [E]',
      Icon: EditOutlined,
      onClick: onEdit,
    });
  }
  if (onMoveCards) {
    singleCardActions.push({
      title: 'Add to...',
      Icon: SendOutlined,
      onClick: card => {
        setSelectedCards([card]);
        onMoveCards();
      },
    });
  }
  if (onDeleteCards) {
    singleCardActions.push({
      title: `Delete [${keySymbols.BACKSPACE}]`,
      Icon: DeleteOutlined,
      onClick: onDelete,
    });
  }

  let cardList;
  if (layout === 'list' && cards.length) {
    cardList = (
      <CardTable
        cards={cards}
        search={search}
        loading={loading}
        onMoveCards={onMoveCards}
        showSorter={showSorter}
        heightOffset={heightOffset}
        hiddenColumns={hiddenColumns}
        numberOfCards={numberOfCards}
        setSelectedCards={setSelectedCards}
        onDeleteCards={onDeleteCards}
        selectedCards={selectedCards}
        actions={singleCardActions}
        onEditCard={onEdit}
        onDeleteCard={onDelete}
      />
    );
  } else if (layout === 'grid' && cards.length) {
    cardList = (
      <CardGrid
        zoom={zoom}
        search={search}
        cards={cards}
        loading={loading}
        widthOffset={widthOffset}
        numberOfCards={numberOfCards}
        actions={singleCardActions}
        onEditCard={onEdit}
        onDeleteCard={onDelete}
        cardsPerRow={cardsPerRow}
        numberOfRows={numberOfRows}
        cardWidth={cardWidth}
      />
    );
  } else {
    cardList = <StyledEmpty description="No cards found" />;
  }

  return (
    <Flex
      direction="column"
      style={{
        width,
        overflowY: 'auto',
        padding: 24,
        transition: 'width 0.2s',
        position: 'relative',
      }}
    >
      {title && (
        <Typography.Title level={2} style={{ marginTop: -16 }}>
          {title}
        </Typography.Title>
      )}
      <Header
        setSearch={setSearch}
        orderByParamName={orderByParamName}
        showAddedBeforeFilter={showAddedBeforeFilter}
        showCollectionFilters={showCollectionFilters}
        showZoomSlider={layout === 'grid'}
        zoom={zoom}
        setZoom={setZoom}
      />
      {loading && !numberOfCards ? <FullscreenSpinner /> : cardList}
    </Flex>
  );
};
