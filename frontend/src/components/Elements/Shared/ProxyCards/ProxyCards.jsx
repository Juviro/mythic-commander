import React from 'react';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import ProxyModal from './ProxyModal';
import { useToggle } from '../../../Hooks';

export default ({ id, type }) => {
  const url = `/proxy/${type}/${id}`;
  const [isVisible, toggleIsVisible] = useToggle();

  return (
    <>
      <Button type="link" onClick={toggleIsVisible} icon={<PrinterOutlined />}>
        Proxy Cards...
      </Button>
      <ProxyModal url={url} onCancel={toggleIsVisible} isVisible={isVisible} />
    </>
  );
};
