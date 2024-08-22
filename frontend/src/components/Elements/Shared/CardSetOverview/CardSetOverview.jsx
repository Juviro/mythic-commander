import React, { useContext } from 'react';
import { Table } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import isMobile from 'utils/isMobile';
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
  const { user } = useContext(UserContext);
  const tableHeight = isMobile() ? 350 : 410;

  return (
    <Table
      dataSource={card?.allSets?.map((cardSet) => ({
        ...cardSet,
        key: cardSet.id,
      }))}
      loading={loading}
      columns={columns(card, isEditing, onChangeAmount, onSaveChanges, !user)}
      onRow={({ id }) => ({
        onClick: () => onChangeSet(id),
      })}
      fixed
      scroll={{ y: tableHeight }}
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
      rowClassName={(row) => (row.id === selectedCardId ? 'table-active' : '')}
    />
  );
};
