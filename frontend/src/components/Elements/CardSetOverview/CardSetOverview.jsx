import React from 'react';
import { Table } from 'antd';

import columns from './columns';

export default ({
  card,
  loading,
  selectedCardId,
  onChangeSet,
  isEditing,
  onChangeAmount,
  onSaveChanges,
  maxHeight = 400,
}) => {
  return (
    <Table
      dataSource={
        card &&
        card.allSets &&
        card.allSets.map(cardSet => ({
          ...cardSet,
          key: cardSet.id,
        }))
      }
      loading={loading}
      columns={columns(card, isEditing, onChangeAmount, onSaveChanges)}
      onRow={({ id }) => ({
        onClick: () => onChangeSet(id),
      })}
      fixed
      scroll={{ y: 370 }}
      align="center"
      showSorterTooltip={false}
      pagination={false}
      size="small"
      style={{
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight,
      }}
      rowClassName={row => (row.id === selectedCardId ? 'table-active' : '')}
    />
  );
};
