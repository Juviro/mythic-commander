import React, { useContext, useEffect, useRef } from 'react';
import { Form, Input, InputRef, Modal, Select } from 'antd';

import GameBrowserContext from '../GameBrowserContext';
import PlanechaseSelection from './PlanechaseSelection';

interface Props {
  onClose: () => void;
}

const getPlanechaseSets = (values: any) => {
  const planechaseSets = Object.entries(values)
    .filter(([key, value]) => values.planechase && key.startsWith('planechase-') && value)
    .map(([key]) => key.replace('planechase-', ''));

  return planechaseSets.map((setWithName) => {
    const [set, setName] = setWithName.split(',');
    return { set, setName };
  });
};

const HostGameModal = ({ onClose }: Props) => {
  const { onHostLobby, user } = useContext(GameBrowserContext);

  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      const planechaseSets = getPlanechaseSets(values);

      onHostLobby({
        name: values.name,
        maxNumberOfPlayers: values.maxNumberOfPlayers,
        planechaseSets,
      });
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
          initialValue={`${user!.username}'s Game`}
          rules={[
            { required: true, message: 'Please enter a name' },
            { min: 3, message: 'Name must be at least 3 characters' },
          ]}
        >
          <Input ref={inputRef} />
        </Form.Item>
        <Form.Item label="Number of Players" name="maxNumberOfPlayers" initialValue={4}>
          <Select options={[1, 2, 3, 4].map((n) => ({ label: n, value: n }))} />
        </Form.Item>
        <PlanechaseSelection />
      </Form>
    </Modal>
  );
};

export default HostGameModal;
