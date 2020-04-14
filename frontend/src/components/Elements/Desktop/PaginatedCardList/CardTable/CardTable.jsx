import React, { useEffect, useState } from 'react';
import { Table } from 'antd';

import columns from './columns';
import useTableShortcuts from './useTableShortcuts';
import { useToggle } from '../../../../Hooks';
import CardModalDesktop from '../../CardModalDesktop';

export default ({
  cards,
  loading,
  numberOfCards,
  showSorter,
  hiddenColumns,
}) => {
  const [showDetails, toggleShowDetail] = useToggle(false);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useTableShortcuts(numberOfCards, toggleShowDetail);

  useEffect(() => {
    const [element] = document.getElementsByClassName('selected');
    if (!element) return;
    const currentElementId = element.getAttribute('data-row-key');
    setSelectedElementId(currentElementId);
  }, [pagination]);

  const selectedCard =
    cards && cards.find(({ id }) => id === selectedElementId);

  return (
    <>
      <Table
        rowKey="id"
        style={{ width: '100%' }}
        size="middle"
        loading={loading}
        dataSource={cards}
        columns={columns({ showSorter, hiddenColumns })}
        showSorterTooltip={false}
        pagination={{
          ...pagination,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} cards`,
        }}
        rowClassName={(_, index) =>
          index + 1 === selectedElementPosition ? 'selected' : undefined
        }
        onRow={(_, index) => ({
          onClick: () => {
            toggleShowDetail(true);
            setSelectedElementPosition(index + 1);
          },
        })}
      />
      <CardModalDesktop
        card={selectedCard}
        visible={showDetails}
        onClose={toggleShowDetail}
      />
    </>
  );
};
