import React from 'react';
import { Drawer, Divider } from 'antd';

import Header from './Header';
import Navigation from './Navigation';
import { Logout, UserAvatar } from '../../../Elements/Shared';
import { darkBackground } from '../../../../constants/colors';

export default ({ isVisible, onCloseDrawer }) => {
  return (
    <Drawer
      title={<Header />}
      placement="left"
      closable
      onClose={onCloseDrawer}
      visible={isVisible}
      zIndex={1002}
      headerStyle={{
        backgroundColor: darkBackground,
        padding: 0,
      }}
      bodyStyle={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 53px)',
        justifyContent: 'space-between',
      }}
    >
      <span>
        <UserAvatar showName />
        <Divider style={{ width: '120%', margin: '16px -24px 8px' }} />
        <Navigation onCloseDrawer={onCloseDrawer} />
      </span>
      <Logout />
    </Drawer>
  );
};
