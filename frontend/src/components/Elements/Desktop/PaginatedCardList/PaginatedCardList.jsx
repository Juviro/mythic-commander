import React, { useEffect } from 'react';
import { StringParam, useQueryParams, NumberParam } from 'use-query-params';

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
  titleButton,
  onEditCard,
  onMoveCards,
}) => {
  const [initialPageSize, setInitialPageSize] = useLocalStorage('pageSize', 25);
  const [{ layout, pageSize }, setParams] = useQueryParams({
    layout: StringParam,
    pageSize: NumberParam,
  });
  const width = `calc(100% - ${widthOffset}px)`;

  // const { cardsPerRow, numberOfRows, cardWidth } = useNumberOfCards(widthOffset);

  useEffect(() => {
    if (!pageSize) {
      setParams({ pageSize: initialPageSize });
    } else {
      setInitialPageSize(pageSize);
    }
    // eslint-disable-next-line
  }, [pageSize]);

  const singleCardActions = [];
  const onEdit = onEditCard
    ? (card) => {
        onEditCard(card);
      }
    : undefined;
  const onDelete = onDeleteCards
    ? (card) => {
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
      onClick: (card) => {
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
        search={search}
        cards={cards}
        loading={loading}
        widthOffset={widthOffset}
        numberOfCards={numberOfCards}
        actions={singleCardActions}
        onEditCard={onEdit}
        onDeleteCard={onDelete}
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
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ width: '100%', marginTop: -16, marginBottom: 16 }}
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
          {titleButton}
        </Flex>
      )}
      <Header
        setSearch={setSearch}
        orderByParamName={orderByParamName}
        showAddedBeforeFilter={showAddedBeforeFilter}
        showCollectionFilters={showCollectionFilters}
      />
      {loading && !numberOfCards ? <FullscreenSpinner /> : cardList}
    </Flex>
  );
};
