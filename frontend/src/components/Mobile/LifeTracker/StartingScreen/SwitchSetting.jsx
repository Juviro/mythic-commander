import React from 'react';
import { Switch, Typography } from 'antd';
import Flex from 'components/Elements/Shared/Flex';

export default ({ checked, onChange, label }) => {
  return (
    <Flex direction="row" align="center" style={{ marginLeft: 6 }}>
      <Switch checked={checked} onChange={onChange} />
      <Typography.Text style={{ fontWeight: 400, fontSize: 20, marginLeft: 32 }}>
        {label}
      </Typography.Text>
    </Flex>
  );
};
