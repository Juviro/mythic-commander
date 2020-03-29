import React from 'react';
import { Modal, Typography } from 'antd';
import Card from '../../Desktop/Card/Card';

export default ({ card, visible, onClose }) => {
  const { name, totalAmount } = card || {};
  let title = name;
  if (totalAmount) title += ` (${totalAmount} collected)`;
  return (
    <Modal
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      title={<Typography.Title level={4}>{title}</Typography.Title>}
      destroyOnClose
      width={1150}
      bodyStyle={{ height: 800 }}
      style={{ maxWidth: '100%' }}
    >
      {card && <Card card={card} />}
    </Modal>
  );
};
