import React from 'react';
import { Modal } from 'antd';

import MoveTo from './MoveTo';

const MoveToModal = ({ moveToList, onCancel, visible, card }) => {
  return (
    <Modal
      centered
      footer={null}
      onCancel={(e) => {
        e.stopPropagation();
        onCancel();
      }}
      open={visible}
      destroyOnClose
    >
      <MoveTo moveToList={moveToList} onClose={onCancel} card={card} />
    </Modal>
  );
};

export default MoveToModal;
