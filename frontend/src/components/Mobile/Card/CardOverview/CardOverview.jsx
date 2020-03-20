import React from 'react';
import { Table, Skeleton } from 'antd';

import columns from './columns';

const CardOverview = ({ card, loading, selectedCardId, onChangeSet }) => {
  if (!card) {
    return <Skeleton active paragraph={4} />;
  }

  return (
    <>
      {card && !loading ? (
        <>
          <Table
            dataSource={card.allSets.map(cardSet => ({
              ...cardSet,
              key: cardSet.id,
            }))}
            columns={columns}
            onRow={({ id }) => ({
              onClick: () => onChangeSet(id),
            })}
            pagination={false}
            size="small"
            style={{
              width: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: 400,
            }}
            rowClassName={row =>
              row.id === selectedCardId ? 'table-active' : ''
            }
          />
        </>
      ) : (
        <Skeleton active paragraph={4} />
      )}
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.selectedCardId !== nextProps.selectedCardId) return false;
  if (prevProps.loading !== nextProps.loading) return false;
  return true;
};

export default React.memo(CardOverview, areEqual);
