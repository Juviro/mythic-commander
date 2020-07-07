import React from 'react';
import { List, Typography, Space } from 'antd';

import PreviewCardImage from '../PreviewCardImage';
import isMobile from '../../../../utils/isMobile';

export default ({ list: { name, cards } }) => {
  return (
    <List header={name} bordered style={{ marginBottom: 16 }} size="small">
      {cards.map(card => (
        <List.Item key={card.id}>
          <Space>
            <PreviewCardImage card={card} highlightOnHover={!isMobile()} />
            <Typography.Text>{card.name}</Typography.Text>
          </Space>
        </List.Item>
      ))}
    </List>
  );
};
