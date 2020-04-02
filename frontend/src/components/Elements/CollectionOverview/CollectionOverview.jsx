import React from 'react';
import { Descriptions } from 'antd';
import { getPriceLabel } from '../../../utils/cardStats';

export default ({ cards, size = 'small', layout = 'horizontal', column }) => {
  const numberOfUniqueCards = cards ? cards.length : 0;
  const numberOfCards = (cards || []).reduce(
    (sum, { totalAmount }) => sum + totalAmount,
    0
  );
  const collectionValue = (cards || []).reduce(
    (sum, { sumPrice }) => sum + sumPrice,
    0
  );

  return (
    <Descriptions
      size={size}
      layout={layout}
      column={column}
      style={{
        fontSize: size === 'large' ? 16 : undefined,
      }}
    >
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      <Descriptions.Item label="Unique Cards">
        {numberOfUniqueCards}
      </Descriptions.Item>
      <Descriptions.Item label="Total value">
        {getPriceLabel(collectionValue, { round: true })}
      </Descriptions.Item>
    </Descriptions>
  );
};
