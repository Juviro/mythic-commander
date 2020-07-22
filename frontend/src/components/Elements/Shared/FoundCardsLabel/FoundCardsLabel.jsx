import React from 'react';
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import boldText from '../../../../utils/boldText';
import Flex from '../Flex';

export default ({ totalResults, loading, search }) => {
  const displayLables = totalResults || !loading;

  if (!displayLables) return null;

  const displayedText = `Found <b>${totalResults}</b> cards${
    search ? ` containign <b>"${search}"</b>` : ''
  }:`;

  return (
    <Flex direction="row" justify="space-between" style={{ margin: '0 16px 16px 6px' }}>
      <span>
        <Typography.Text style={{ fontSize: 16 }}>
          {boldText(displayedText)}
        </Typography.Text>
      </span>
      {loading && <LoadingOutlined />}
    </Flex>
  );
};
