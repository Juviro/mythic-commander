import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import { useQueryParam, StringParam } from 'use-query-params';
import useTableShortcuts from './useTableShortcuts';
import CardModalDesktop from '../../CardModalDesktop';
import columns from './columns';
import { filterByName } from '../../../../../utils/cardFilter';

export default ({ cards, loading }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [query] = useQueryParam('name', StringParam);
  const filteredCards = filterByName(cards, query);
  const toggleShowDetail = () => setShowDetails(!showDetails);

  const {
    pagination,
    selectedElementPosition,
    setSelectedElementPosition,
  } = useTableShortcuts(filteredCards, toggleShowDetail);

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
        dataSource={filteredCards}
        columns={columns}
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
            setShowDetails(true);
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
