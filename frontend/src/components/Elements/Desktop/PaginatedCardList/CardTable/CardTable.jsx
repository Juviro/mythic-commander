import React, { useEffect } from 'react';
import { Table } from 'antd';

import columns from './columns';
import useTableShortcuts from './useTableShortcuts';
import { useToggle } from '../../../../Hooks';
import CardModalDesktop from '../../CardModalDesktop';
import scrollIntoView from '../../../../../utils/scrollIntoView';

// navbar, layout picker row, table header, inner margin, footer
const HEIGHT_OFFSET = 49 + 48 + 39 + 32 + 56;

export default ({
  cards,
  loading,
  numberOfCards,
  showSorter,
  hiddenColumns,
  onDeleteCards,
}) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useTableShortcuts(numberOfCards, toggleShowDetail);

  const selectedCard =
    cards && cards.find((_, index) => index === selectedElementPosition - 1);

  useEffect(() => {
    const [element] = document.getElementsByClassName('selected');

    if (!element) return;
    scrollIntoView(element);
  }, [selectedElementPosition]);

  const innerTableWidth = window.innerHeight - HEIGHT_OFFSET;

  return (
    <>
      <Table
        rowKey="id"
        style={{ width: '100%' }}
        size="small"
        fixed={false}
        loading={loading}
        dataSource={cards}
        columns={columns({ showSorter, hiddenColumns, onDeleteCards })}
        showSorterTooltip={false}
        pagination={{
          ...pagination,
          showSizeChanger: true,
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
