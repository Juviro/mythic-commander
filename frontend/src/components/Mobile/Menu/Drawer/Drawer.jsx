import React from 'react';
import { Drawer } from 'antd';
import Header from './Header';
import Navigation from './Navigation';
import Logout from './Logout';

export default ({ isVisible, onCloseDrawer }) => {
  return (
    <Drawer
      title={<Header />}
      placement="left"
      closable
      onClose={onCloseDrawer}
      visible={isVisible}
      zIndex={1002}
      bodyStyle={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 53px)',
        justifyContent: 'space-between',
      }}
    >
      <Navigation onCloseDrawer={onCloseDrawer} />
      <Logout />
    </Drawer>
  );
};
