import React, { useState } from 'react';
import { Table } from 'antd';

import useTableShortcuts from './useTableShortcuts';
import CardModalDesktop from '../CardModalDesktop';
import columns from './columns';

const getSelectedCard = (
  cards,
  { pageSize, current },
  selectedElementPosition
) => {
  if (!cards || !selectedElementPosition) return null;

  const index = selectedElementPosition - 1 + pageSize * (current - 1);
  return cards[index];
};

export default ({ cards, loading }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetail = () => setShowDetails(!showDetails);
  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useTableShortcuts(cards, toggleShowDetail);

  const selectedCard = getSelectedCard(
    cards,
    pagination,
    selectedElementPosition
  );

  return (
    <>
      <Table
        pagination={pagination}
        rowKey="id"
        style={{ width: '100%', height: '100%', fontWeight: 500 }}
        size="middle"
        loading={loading}
        dataSource={cards}
        columns={columns}
        rowClassName={(_, index) =>
          index + 1 === selectedElementPosition ? 'selected' : undefined
        }
        onRow={(_, index) => ({
          onClick: () => {
            setSelectedElementPosition(index + 1);
            setShowDetails(true);
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
