import React, { useContext } from 'react';
import { Drawer, Divider } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import Logout from 'components/Elements/Shared/Logout';
import UserAvatar from 'components/Elements/Shared/UserAvatar';
import Header from './Header';
import Navigation from './Navigation';
import { darkBackground } from '../../../../constants/colors';

export default ({ isVisible, onCloseDrawer }) => {
  const { user } = useContext(UserContext);

  return (
    <Drawer
      title={<Header />}
      placement="left"
      closable
      onClose={onCloseDrawer}
      visible={isVisible}
      zIndex={1002}
      width="auto"
      headerStyle={{
        backgroundColor: darkBackground,
        padding: 0,
        borderRadius: 0,
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
        <UserAvatar textPosition="right" />
        <Divider />
        <Navigation onCloseDrawer={onCloseDrawer} />
      </span>
      {user && <Logout />}
    </Drawer>
  );
};
