import React, { useState } from 'react';
import { List } from 'antd';
import Card from './Card';

export default ({ cards }) => {
  const [openCardId, setOpenCardId] = useState(null);
  if (!cards || !cards.length) return null;

  return (
    <List
      header="Collection"
      dataSource={cards}
      style={{ width: '100%' }}
      renderItem={card => (
        <Card
          card={card}
          setOpenCardId={setOpenCardId}
          isOpen={card.oracle_id === openCardId}
        />
      )}
    />
  );
};
