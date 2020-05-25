import React from 'react';
import { Typography } from 'antd';

import { success } from '../../../../constants/colors';

export default ({ marginLeft = 8 }) => {
  return (
    <Typography.Text style={{ color: success, marginLeft }}>
      owned
    </Typography.Text>
  );
};
