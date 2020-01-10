import React from 'react';

import { Table } from 'antd';
import { getColumns, getSortedCards } from './tableHelper';

export default ({
  cards,
  type,
  noPagination,
  loading = false,
  displayedColumns = [],
  setHighlightedCard = () => {},
}) => {
  const dataSource = getSortedCards(cards, type);

  const filteredColumns = getColumns(type, displayedColumns);

  return (
    <div style={{ width: 'calc(100% - 300px)' }}>
      <Table
        loading={loading && !cards.length}
        size="small"
        tableLayout="fixed"
        columns={filteredColumns}
        dataSource={dataSource}
        pagination={noPagination ? false : { pageSize: 20 }}
        onRow={record => ({
          onMouseEnter: () => setHighlightedCard(record.name),
        })}
      />
    </div>
  );
};
