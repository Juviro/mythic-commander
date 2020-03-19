import React from 'react';
import { Descriptions, Skeleton } from 'antd';
import { getPriceLabel } from '../../../utils/cardStats';

export default ({ wantsList }) => {
  if (!wantsList) return <Skeleton />;
  const { cards } = wantsList;
  const numberOfCards = cards.reduce((sum, { amount }) => sum + amount, 0);
  const numberOfUniqueCards = cards.length;
  const collectionValue = cards.reduce(
    (sum, { minPrice }) => sum + minPrice,
    0
  );

  return (
    <Descriptions size="small" style={{ marginLeft: 8 }}>
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      <Descriptions.Item label="Unique Cards">
        {numberOfUniqueCards}
      </Descriptions.Item>
      <Descriptions.Item label="Total costs">
        {getPriceLabel(collectionValue)}
      </Descriptions.Item>
    </Descriptions>
  );
};
