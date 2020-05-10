import React, { useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import styled, { css } from 'styled-components';

import { withRouter } from 'react-router';
import columns from './columns';
import useTableShortcuts from './useTableShortcuts';
import { useToggle, useShortcut } from '../../../../Hooks';
import CardModalDesktop from '../../CardModalDesktop';
import scrollIntoView from '../../../../../utils/scrollIntoView';

// navbar, layout picker row, table header, inner margin, footer, ?
const DEFAULT_HEIGHT_OFFSET = 49 + 48 + 39 + 32 + 56 + 16;

const StyledButtonWrapper = styled.div`
  width: 150px;
  margin: 16px;
  position: absolute;
  top: ${({ heightOffset = 0 }) => 64 + heightOffset}px;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      display: none;
    `}
`;

const CardTable = ({
  cards,
  loading,
  search,
  heightOffset,
  numberOfCards,
  showSorter,
  hiddenColumns,
  onDeleteCards,
  selectedCards,
  setSelectedCards,
  onMoveCards,
  actions,
  onEditCard,
  onDeleteCard,
  history,
}) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const toggleElementSelection = elementPosition => {
    const elementToToggle = cards && cards[elementPosition - 1];
    if (!elementToToggle) return;
    const filteredCardsToDelete = selectedCards.filter(
      ({ id }) => id !== elementToToggle.id
    );
    const newSelectedIds =
      selectedCards.length !== filteredCardsToDelete.length
        ? filteredCardsToDelete
        : filteredCardsToDelete.concat(elementToToggle);
    setSelectedCards(newSelectedIds);
  };

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useTableShortcuts(
    numberOfCards,
    toggleShowDetail,
    toggleElementSelection
  );
  const selectedCard = cards && cards[selectedElementPosition - 1];

  const onPressDelete = () => {
    if (!onDeleteCard) return;
    onDeleteCard(selectedCard);
  };
  useShortcut('DEL', !showDetails ? onPressDelete : null);
  useShortcut(
    'e',
    !showDetails && onEditCard ? () => onEditCard(selectedCard) : null
  );

  // close modal when list changes
  useEffect(() => {
    toggleShowDetail(false);
    setSelectedElementPosition(1);
    // eslint-disable-next-line
  }, [history.location.pathname]);

  useEffect(() => {
    const [element] = document.getElementsByClassName('selected');

    if (!element) return;
    scrollIntoView(element);
  }, [selectedElementPosition]);

  const innerTableWidth =
    window.innerHeight - DEFAULT_HEIGHT_OFFSET - heightOffset;

  // TODO: enable for all (search)
  const rowSelection = onDeleteCards && {
    onChange: selectedRows =>
      setSelectedCards(cards.filter(({ id }) => selectedRows.includes(id))),
    selectedRowKeys: selectedCards.map(({ id }) => id),
  };

  return (
    <>
      <StyledButtonWrapper
        heightOffset={heightOffset}
        isVisible={Boolean(selectedCards && selectedCards.length)}
      >
        <Space>
          <Button type="primary" ghost onClick={onMoveCards}>
            Add to...
          </Button>
          <Button type="danger" onClick={onDeleteCards}>
            Delete
          </Button>
        </Space>
      </StyledButtonWrapper>
      <Table
        rowKey="id"
        style={{ width: '100%' }}
        size="small"
        fixed={false}
        loading={loading}
        dataSource={cards}
        columns={columns({
          showSorter,
          search,
          hiddenColumns,
          actions,
        })}
        showSorterTooltip={false}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          position: ['topRight'],
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} cards`,
        }}
        rowClassName={(_, index) => {
          if (index + 1 !== selectedElementPosition) return null;
          return 'selected';
        }}
        scroll={{ y: innerTableWidth }}
        onRow={(_, index) => ({
          onClick: () => {
            toggleShowDetail(true);
            setSelectedElementPosition(index + 1);
          },
        })}
        rowSelection={rowSelection}
      />
      <CardModalDesktop
        card={selectedCard}
        loading={loading}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};

export default withRouter(CardTable);
