import React from 'react';

import { Table } from 'antd';
import { isCardLegal } from '../../../utils/cardStats';
import { getColumns, getSortedCards } from './tableHelper';

export default ({
  cards,
  commander,
  type,
  noPagination,
  loading = false,
  displayedColumns = [],
  markNonLegal,
  Actions = null,
}) => {
  const dataSource = getSortedCards(cards.lenght ? [cards[0]] : cards, type);

  const filteredColumns = getColumns(displayedColumns, Actions);

  return (
    <Table
      loading={loading && !cards.length}
      size="small"
      tableLayout="fixed"
      columns={filteredColumns}
      dataSource={dataSource}
      rowClassName={card => markNonLegal && (isCardLegal(card, commander) ? '' : 'not-legal')}
      pagination={noPagination ? false : { pageSize: 20 }}
    />
  );
};
