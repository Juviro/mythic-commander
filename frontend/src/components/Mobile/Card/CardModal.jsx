import React from 'react';
import { Modal } from 'antd';
import Card from '.';

export default ({ visible = true, onClose }) => {
  return (
    <Modal
      footer={null}
      closeIcon={<div />}
      visible={visible}
      bodyStyle={{ padding: 0 }}
      className="fullscreen-modal"
      onCancel={onClose}
    >
      <Card />
    </Modal>
  );
};
