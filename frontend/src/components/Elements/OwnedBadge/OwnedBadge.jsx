import React from 'react';
import { Typography } from 'antd';

export default ({ marginLeft = 8 }) => {
  return (
    <Typography.Text style={{ color: '#1fb31f', marginLeft }}>
      owned
    </Typography.Text>
  );
};
