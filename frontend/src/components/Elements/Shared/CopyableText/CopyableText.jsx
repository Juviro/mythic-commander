import React from 'react';
import { Typography, Input } from 'antd';
import Flex from '../Flex';

export default ({ text }) => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      style={{ marginTop: 8, width: '100%' }}
    >
      <Input readOnly value={text} onFocus={e => e.target.select()} />
      <Typography.Text copyable={{ text }} style={{ marginLeft: 8 }} />
    </Flex>
  );
};
