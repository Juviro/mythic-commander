import React from 'react';
import { StarTwoTone } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default ({ style, tooltip = 'Foil' }) => (
  <Tooltip title={tooltip}>
    <StarTwoTone
      style={{ marginLeft: '4px', ...style }}
      theme="twoTone"
      twoToneColor="#d4af37"
    />
  </Tooltip>
);
