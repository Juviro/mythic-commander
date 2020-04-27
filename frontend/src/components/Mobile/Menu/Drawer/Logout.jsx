import React from 'react';
import { List, Typography } from 'antd';
import { UserAvatar } from '../../../Elements/Shared';

export default () => {
  const logOut = () => {
    // TODO: delete session from db
    window.localStorage.setItem('session', null);
    window.location.href = '/login';
  };

  return (
    <List>
      <List.Item
        onClick={logOut}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: 0,
        }}
      >
        <UserAvatar />
        <Typography.Text style={{ marginLeft: 16 }}>Logout</Typography.Text>
      </List.Item>
    </List>
  );
};
