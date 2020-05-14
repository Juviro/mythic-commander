import React from 'react';
import { Button } from 'antd';

import ProxyModal from './ProxyModal';
import { useToggle } from '../../../Hooks';

export default ({ id, type }) => {
  const url = `/proxy/${type}/${id}`;
  const [isVisible, toggleIsVisible] = useToggle();

  return (
    <>
      <Button type="link" onClick={toggleIsVisible}>
        Proxy Cards...
      </Button>
      <ProxyModal url={url} onCancel={toggleIsVisible} isVisible={isVisible} />
    </>
  );
};
