import React from 'react';
import { Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import Flex from '../../Flex';

export default ({ title, onBack }) => {
  return (
    <Flex align="center" style={{ marginBottom: 10, cursor: 'pointer' }} onClick={onBack}>
      <Space>
        <LeftOutlined />
        <Typography.Title level={4} style={{ marginBottom: 0 }}>
          {title}
        </Typography.Title>
      </Space>
    </Flex>
  );
};
