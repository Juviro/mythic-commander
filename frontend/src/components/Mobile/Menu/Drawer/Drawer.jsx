import React, { useContext } from 'react';
import { Drawer, Divider } from 'antd';

import UserContext from 'components/Provider/UserProvider';
import Logout from 'components/Elements/Shared/Logout';
import UserAvatar from 'components/Elements/Shared/UserAvatar';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';
import { darkBackground } from '../../../../constants/colors';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
  .ant-drawer-close {
    color: white;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 16px 0px 8px !important;
`;

export default ({ isVisible, onCloseDrawer }) => {
  const { user } = useContext(UserContext);

  return (
    <StyledDrawer
      title={<Header />}
      placement="left"
      closable
      onClose={onCloseDrawer}
      open={isVisible}
      zIndex={1002}
      width="auto"
      headerStyle={{
        backgroundColor: darkBackground,
        padding: 0,
        borderRadius: 0,
      }}
      styles={{
        body: {
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 53px)',
          justifyContent: 'space-between',
        },
      }}
    >
      <span>
        <UserAvatar textPosition="right" />
        <StyledDivider />
        <Navigation onCloseDrawer={onCloseDrawer} />
      </span>
      {user && <Logout />}
    </StyledDrawer>
  );
};
