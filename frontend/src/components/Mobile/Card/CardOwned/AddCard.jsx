import React from 'react';
import { Select } from 'antd';

export default ({ cards, onAddCard }) => {
  if (!cards.length) return null;
  return (
    <Select value="Add a set..." onChange={onAddCard} style={{ marginTop: 16 }}>
      {cards.map(({ id, set_name }) => (
        <Select.Option value={id} key={id}>
          {set_name}
        </Select.Option>
      ))}
    </Select>
  );
};
