import React, { useEffect, useRef } from 'react';
import { Form, Input, InputRef, Modal, Select } from 'antd';

import { User } from '../../../contexts/SocketProvider';
import { GameOptions } from '../../../types/api.types';

interface Props {
  user: User;
  onClose: () => void;
  onHostGame: (gameOptions: GameOptions) => void;
}

const HostGameModal = ({ user, onClose, onHostGame }: Props) => {
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      onHostGame(values);
      onClose();
    });
  };

  return (
    <Modal open title="Host Game" centered onCancel={onClose} onOk={onSubmit}>
      <Form
        name="basic"
        form={form}
        onKeyDown={(e) => {
          if (e.key !== 'Enter') return;
          onSubmit();
        }}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        labelAlign="left"
      >
        <Form.Item
          label="Game Name"
          name="name"
          initialValue={`${user.username}'s Game`}
          rules={[
            { required: true, message: 'Please enter a name' },
            { min: 3, message: 'Name must be at least 3 characters' },
          ]}
        >
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item label="Number of Players" name="numberOfPlayers" initialValue={4}>
          <Select options={[1, 2, 3, 4].map((n) => ({ label: n, value: n }))} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HostGameModal;
