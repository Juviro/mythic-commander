import React, { useContext } from 'react';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

import UserContext from 'components/Provider/UserProvider';
import ProxyModal from './ProxyModal';
import { useToggle } from '../../../Hooks';

export default ({ id, type }) => {
  const url = `/proxy/${type}/${id}`;
  const { user } = useContext(UserContext);
  const [isVisible, toggleIsVisible] = useToggle();

  const onClick = () => {
    // only logged in users can see the modal
    // and select the option "unowned only"
    if (user) {
      toggleIsVisible();
    } else {
      window.open(url, '_newtab');
    }
  };

  return (
    <>
      <Button type="link" onClick={onClick} icon={<PrinterOutlined />}>
        Proxy Cards...
      </Button>
      <ProxyModal url={url} onCancel={toggleIsVisible} isVisible={isVisible} />
    </>
  );
};
