import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import styled from 'styled-components';

import columns from './columns';
import useTableShortcuts from './useTableShortcuts';
import { useToggle, useShortcut } from '../../../../Hooks';
import CardModalDesktop from '../../CardModalDesktop';
import scrollIntoView from '../../../../../utils/scrollIntoView';

// navbar, layout picker row, table header, inner margin, footer
const HEIGHT_OFFSET = 49 + 48 + 39 + 32 + 56;

const StyledButtonWrapper = styled.div`
  width: 150px;
  margin: 16px;
  position: absolute;
  top: 64px;
  z-index: 1;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`;

export default ({
  cards,
  loading,
  numberOfCards,
  showSorter,
  hiddenColumns,
  onDeleteCards,
  cardIdsToDelete,
  setCardIdsToDelete,
}) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const toggleElementSelection = elementPosition => {
    const elementToToggle = cards && cards[elementPosition - 1];
    if (!elementToToggle) return;
    const { oracle_id } = elementToToggle;
    const filteredCardIdsToDelete = cardIdsToDelete.filter(
      id => id !== oracle_id
    );
    const newSelectedIds =
      cardIdsToDelete.length !== filteredCardIdsToDelete.length
        ? filteredCardIdsToDelete
        : filteredCardIdsToDelete.concat(oracle_id);
    setCardIdsToDelete(newSelectedIds);
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

  const deleteWhenSelected = () => {
    if (!cardIdsToDelete || !cardIdsToDelete.length) return;
    onDeleteCards();
  };
  useShortcut('DEL', deleteWhenSelected);

  const selectedCard = cards && cards[selectedElementPosition - 1];

  useEffect(() => {
    const [element] = document.getElementsByClassName('selected');

    if (!element) return;
    scrollIntoView(element);
  }, [selectedElementPosition]);

  const innerTableWidth = window.innerHeight - HEIGHT_OFFSET;

  const rowSelection = onDeleteCards && {
    onChange: selectedRows => setCardIdsToDelete(selectedRows),
    selectedRowKeys: cardIdsToDelete,
  };

  const onDeleteSingleCard = onDeleteCards
    ? oracleId => {
        setCardIdsToDelete([oracleId]);
        onDeleteCards();
      }
    : undefined;

  return (
    <>
      <StyledButtonWrapper
        isVisible={Boolean(cardIdsToDelete && cardIdsToDelete.length)}
      >
        <Button type="danger" onClick={onDeleteCards}>
          Delete
        </Button>
      </StyledButtonWrapper>
      <Table
        rowKey="oracle_id"
        style={{ width: '100%' }}
        size="small"
        fixed={false}
        loading={loading}
        dataSource={cards}
        columns={columns({
          showSorter,
          hiddenColumns,
          onDeleteCard: onDeleteSingleCard,
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
