import React from 'react';
import { List } from 'antd';

export default () => {
  const logOut = () => {
    // TODO: delete session from db
    window.localStorage.setItem('session', null);
    window.location.href = '/login';
  };

  return (
    <List>
      <List.Item onClick={logOut}>Logout</List.Item>
    </List>
  );
};
