import React from 'react';
import { List, Space, Typography } from 'antd';

import isMobile from 'utils/isMobile';
import PreviewCardImage from '../PreviewCardImage';

export default ({ cards }) => (
  <List>
    {cards.map((card) => (
      <List.Item key={card.id}>
        <Space>
          <PreviewCardImage card={card} highlightOnHover={!isMobile()} />
          <Typography.Text strong>
            {`${card.amount || card.totalAmount || 1}x`}
          </Typography.Text>
          <Typography.Text ellipsis>{card.name}</Typography.Text>
        </Space>
      </List.Item>
    ))}
  </List>
);
