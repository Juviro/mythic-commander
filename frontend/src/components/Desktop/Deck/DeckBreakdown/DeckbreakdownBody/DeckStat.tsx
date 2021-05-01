import { Divider, Space, Typography } from 'antd';
import React from 'react';

interface Props {
  children: React.ReactNode;
  title: React.ReactNode;
}

export const DeckStat = ({ children, title }: Props) => {
  return (
    <Space direction="vertical">
      <Divider />
      <Typography.Text strong style={{ fontSize: 16 }}>
        {title}
      </Typography.Text>
      {children}
    </Space>
  );
};
