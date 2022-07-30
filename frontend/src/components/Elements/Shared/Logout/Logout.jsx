import React from 'react';
import { Typography } from 'antd';
import { useMutation } from '@apollo/client';
import { LogoutOutlined } from '@ant-design/icons';

import { useHistory } from 'react-router';
import client from 'network/graphqlClient';
import Flex from '../Flex';
import { logout } from './queries';

export default () => {
  const [mutate] = useMutation(logout);
  const { push } = useHistory();

  const logOut = async () => {
    const sessionId = window.localStorage.getItem('session');
    await mutate({ variables: { sessionId } });
    window.localStorage.setItem('session', null);
    await client.resetStore();
    push('/');
  };

  return (
    <Flex onClick={logOut} align="baseline">
      <LogoutOutlined />
      <Typography.Text style={{ marginLeft: 16 }}>Logout</Typography.Text>
    </Flex>
  );
};
