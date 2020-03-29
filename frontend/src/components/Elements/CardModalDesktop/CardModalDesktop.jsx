import React from 'react';
import { Modal, Typography } from 'antd';
import Card from '../../Desktop/Card/Card';

export default ({ card, visible, onClose }) => {
  const { name } = card || {};
  return (
    <Modal
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      title={<Typography.Title level={4}>{name}</Typography.Title>}
      destroyOnClose
      width={1150}
      bodyStyle={{ height: 800 }}
      style={{ maxWidth: '100%' }}
    >
      {card && <Card card={card} />}
    </Modal>
  );
};
