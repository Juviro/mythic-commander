import React from 'react';
import { Table } from 'antd';
import { getPriceLabel } from '../../../utils/cardStats';
import PreviewCardImage from '../PreviewCardImage';

const columns = [
  {
    title: 'Card',
    key: 'img',
    render: card => <PreviewCardImage card={card} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'minPrice',
    key: 'minPrice',
    render: getPriceLabel,
  },
];

export default ({ cards, loading }) => {
  console.log('cards :', cards);

  return (
    <Table
      style={{ width: '100%', height: '100%' }}
      size="middle"
      loading={loading}
      dataSource={cards}
      columns={columns}
    />
  );
};
