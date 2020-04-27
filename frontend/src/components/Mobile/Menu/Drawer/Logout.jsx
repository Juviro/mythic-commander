import React from 'react';
import { Typography, Statistic } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import { UserAvatar, Flex } from '../../../Elements/Shared';

export default () => {
  const logOut = () => {
    // TODO: delete session from db
    window.localStorage.setItem('session', null);
    window.location.href = '/login';
  };

  return (
    <Flex justify="space-between" align="flex-end">
      <Statistic
        title="Logged in as"
        formatter={() => <UserAvatar showName />}
      />
      <Flex onClick={logOut} align="baseline">
        <LogoutOutlined />
        <Typography.Text style={{ marginLeft: 16 }}>Logout</Typography.Text>
      </Flex>
    </Flex>
  );
};
