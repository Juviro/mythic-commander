import React from 'react';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { primary } from 'constants/colors';

export default ({ id, type }) => {
  const href = `/proxy?type=${type}&value=${id}`;

  return (
    <Button
      type="link"
      icon={<PrinterOutlined />}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: primary }}
    >
      Proxy Cards
    </Button>
  );
};
