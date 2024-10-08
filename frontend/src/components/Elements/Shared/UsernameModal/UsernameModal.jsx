import React, { useContext, useState } from 'react';
import { Modal, Typography, Input } from 'antd';
import { useMutation } from '@apollo/client';

import UserContext from 'components/Provider/UserProvider';
import message from '../../../../utils/message';
import { setUsername } from './queries';

const UsernameModal = () => {
  const { user, loading } = useContext(UserContext);
  const [mutate] = useMutation(setUsername);
  const [value, setValue] = useState('');

  const onSubmit = async () => {
    await mutate({ variables: { username: value } });
    message(`Welcome <b>${value}</b>!`);
  };

  if (!user || loading || user.username) return null;

  const isValid = value.match(/^[A-z0-9-_]{4,25}$/);

  return (
    <Modal
      title="Pick a username"
      open
      closable={false}
      okText="Set Username"
      okButtonProps={{
        disabled: !isValid,
        onClick: onSubmit,
      }}
      cancelButtonProps={{
        'aria-hidden': true,
        style: { display: 'none' },
      }}
    >
      <Typography.Text style={{ fontSize: 16 }}>
        Please pick a username. It will be visible to people you share your collection
        with.
        <br />
        <br />
        Allowed characters: a-z, A-Z, 0-9, -, _
      </Typography.Text>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ marginTop: 32 }}
        placeholder="Pick a username..."
        onKeyDown={(event) => {
          if (event.key !== 'Enter' || !isValid) return;
          onSubmit();
        }}
      />
    </Modal>
  );
};

export default UsernameModal;
