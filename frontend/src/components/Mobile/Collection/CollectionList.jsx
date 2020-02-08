import React from 'react';
import { List } from 'antd';
import Card from './Card';

export default ({ cards }) => {
  if (!cards || !cards.length) return null;

  return (
    <List
      header={
        <span style={{ marginLeft: 8, fontWeight: 600 }}>Your Collection</span>
      }
      dataSource={cards}
      style={{ width: '100%' }}
      renderItem={card => <Card card={card} />}
    />
  );
};
