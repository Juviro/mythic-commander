import React from 'react';
import { Modal } from 'antd';
import CardDetailsDesktop from '../CardDetailsDesktop';

export default ({ card, visible, onClose }) => {
  return (
    <Modal
      centered
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={1100}
      bodyStyle={{ height: 850 }}
      style={{ maxWidth: '100%' }}
    >
      {card ? <CardDetailsDesktop card={card} /> : null}
    </Modal>
  );
};
