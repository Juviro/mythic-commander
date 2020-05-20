import React from 'react';
import { Typography } from 'antd';

import { error } from '../../../../constants/colors';

export default ({ marginLeft = 8 }) => {
  return (
    <Typography.Text style={{ color: error, marginLeft }}>
      not owned
    </Typography.Text>
  );
};
