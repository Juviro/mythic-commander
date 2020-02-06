import React from 'react';
import { Button } from 'antd';

export default ({ title, onShowAll }) => (
  <span>
    {title}
    <Button type="link" style={{ float: 'right' }} onClick={onShowAll}>
      show more
    </Button>
  </span>
);
