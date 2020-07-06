import React, { useState } from 'react';
import { Modal, Typography, Input } from 'antd';
import { useQuery, useMutation } from 'react-apollo';

import message from '../../../../utils/message';
import { getUser, setUsername } from './queries';
import { useToggle } from '../../../Hooks';
import useSubmitOnEnter from '../../../Hooks/useSubmitOnEnter';

export default () => {
  const { data, loading } = useQuery(getUser);
  const [mutate] = useMutation(setUsername);
  const [isVisible, toggleIsVisible] = useToggle(true);
  const [value, setValue] = useState('');

  const onSubmit = async () => {
    await mutate({ variables: { username: value } });
    message(`Welcome <b>${value}</b>!`);
  };

  if (!data || loading || data.user.username) return null;

  const isValid = value.match(/^[A-z0-9-_]{4,25}$/);

  return (
    <Modal
      title="Pick a username"
      visible={isVisible}
      cancelText="Pick later"
      okText="Set Username"
      okButtonProps={{
        disabled: !isValid,
        onClick: onSubmit,
      }}
      onCancel={toggleIsVisible}
    >
      <Typography.Text style={{ fontSize: 16 }}>
        Please pick a username. It will be visible to people you share your
        collection with.
        <br />
        <br />
        Allowed characters: a-z, A-Z, 0-9, -, _
      </Typography.Text>
      <Input
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ marginTop: 32 }}
        placeholder="Pick a username..."
        onKeyDown={useSubmitOnEnter(isValid && onSubmit)}
      />
    </Modal>
  );
};
