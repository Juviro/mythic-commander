import React from 'react';
import { Button } from 'antd';

export default ({
  title,
  showMoreButton: { onClick, visible, totalResults } = {},
}) => (
  <span>
    {title}
    {visible && (
      <Button type="link" style={{ float: 'right' }} onClick={onClick}>
        {`show all ${totalResults || ''}`}
      </Button>
    )}
  </span>
);
