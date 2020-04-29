import React from 'react';
import { Typography } from 'antd';
import { useMutation } from 'react-apollo';
import { LogoutOutlined } from '@ant-design/icons';

import Flex from '../Flex';
import { logout } from './queries';

export default () => {
  const [mutate] = useMutation(logout);
  const logOut = async () => {
    const sessionId = window.localStorage.getItem('session');
    await mutate({ variables: { sessionId } });
    window.localStorage.setItem('session', null);
    window.location.href = '/login';
  };

  return (
    <Flex onClick={logOut} align="baseline">
      <LogoutOutlined />
      <Typography.Text style={{ marginLeft: 16 }}>Logout</Typography.Text>
    </Flex>
  );
};
