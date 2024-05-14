import React from 'react';
import { Switch, Tooltip, Typography } from 'antd';
import Flex from 'components/Elements/Shared/Flex';
import { InfoCircleOutlined } from '@ant-design/icons';

export default ({ checked, onChange, label, tooltip = null, disabled = false }) => {
  return (
    <Flex direction="row" align="center" justify="space-between">
      <Typography.Text style={{ fontWeight: 400, fontSize: 20 }}>
        <span style={{ marginRight: 8 }}>{label}</span>
        {tooltip && (
          <Tooltip title={tooltip} placement="top">
            <InfoCircleOutlined />
          </Tooltip>
        )}
      </Typography.Text>
      <Switch
        style={{ marginLeft: 8 }}
        checked={disabled ? false : checked}
        onChange={onChange}
        disabled={disabled}
      />
    </Flex>
  );
};
