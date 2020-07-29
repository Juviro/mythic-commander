import React from 'react';
import { Typography, Space } from 'antd';

import Flex from '../Flex';
import PreviewCardImage from '../PreviewCardImage';

export default ({ card }) => {
  return (
    <Flex align="center">
      <Space>
        <PreviewCardImage card={card} highlightOnHover />
        <Typography.Text>{`${card.amount}x`}</Typography.Text>
        <Typography.Text ellipsis style={{ maxWidth: 135 }}>
          {card.name}
        </Typography.Text>
      </Space>
    </Flex>
  );
};
