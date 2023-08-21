import React from 'react';
import { Switch, Typography } from 'antd';
import Flex from 'components/Elements/Shared/Flex';

export default ({ checked, onChange, label }) => {
  return (
    <Flex direction="row" align="center" justify="space-between">
      <Typography.Text style={{ fontWeight: 400, fontSize: 20 }}>{label}</Typography.Text>
      <Switch checked={checked} onChange={onChange} />
    </Flex>
  );
};
