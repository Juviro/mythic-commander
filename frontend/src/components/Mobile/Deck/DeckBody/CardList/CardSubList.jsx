import React from 'react';
import { List } from 'antd';
import SublistHeader from './SublistHeader';
import Card from './Card';

export default ({ cards, type, commander }) => {
  if (!cards || !cards.length) return null;
  const dataSource = cards.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <List
      header={<SublistHeader type={type} numberOfCards={cards.length} />}
      dataSource={dataSource}
      style={{ width: '100%' }}
      renderItem={card => <Card card={card} commander={commander} />}
    />
  );
};
