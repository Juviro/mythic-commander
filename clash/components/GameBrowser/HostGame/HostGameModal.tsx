import React from 'react';
import { Form, Input, Modal } from 'antd';

import { User } from '../../../contexts/SocketProvider';

interface Props {
  user: User;
  onClose: () => void;
  onHostGame: (name: string) => void;
}

const HostGameModal = ({ user, onClose, onHostGame }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open
      title="Host Game"
      centered
      onCancel={onClose}
      onOk={() => {
        form.validateFields().then((values) => {
          onHostGame(values.gamename);
          onClose();
        });
      }}
    >
      <Form name="basic" form={form}>
        <Form.Item
          label="Game Name"
          name="gamename"
          initialValue={`${user.username}'s Game`}
          rules={[
            { required: true, message: 'Please enter a name' },
            { min: 3, message: 'Name must be at least 3 characters' },
          ]}
        >
          <Input autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default HostGameModal;
