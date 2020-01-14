import React from 'react';

import { Table } from 'antd';
import { getColumns, getSortedCards } from './tableHelper';
import { isCardLegal } from '../../../Decks/Deck/LeftSidebar/DeckProfile/Stats';

export default ({
  cards,
  commander,
  type,
  noPagination,
  loading = false,
  displayedColumns = [],
  markNonLegal,
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
        rowClassName={card => markNonLegal && (isCardLegal(card, commander) ? '' : 'not-legal')}
        pagination={noPagination ? false : { pageSize: 20 }}
        onRow={record => ({
          onMouseEnter: () => setHighlightedCard(record.name),
        })}
      />
    </div>
  );
};
