import React from 'react';
import { Descriptions, Skeleton } from 'antd';
import { getPriceLabel } from '../../../../utils/cardStats';

export default ({ wantsList }) => {
  if (!wantsList) return <Skeleton />;
  const { cards } = wantsList;
  const numberOfCards = cards.reduce((sum, { amount }) => sum + amount, 0);
  const numberOfUniqueCards = cards.length;
  const wantsListValue = cards.reduce(
    (sum, { minPrice, amount }) => sum + minPrice * amount,
    0
  );

  return (
    <Descriptions style={{ marginLeft: 8 }} column={1}>
      <Descriptions.Item label="Total Cards">{numberOfCards}</Descriptions.Item>
      <Descriptions.Item label="Unique Cards">{numberOfUniqueCards}</Descriptions.Item>
      <Descriptions.Item label="Total costs">
        {getPriceLabel(wantsListValue)}
      </Descriptions.Item>
    </Descriptions>
  );
};
