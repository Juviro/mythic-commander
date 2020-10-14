import React from 'react';
import { Modal } from 'antd';

import MoveTo from './MoveTo';

export default ({ moveToList, onCancel, visible, card }) => {
  return (
    <Modal
      centered
      footer={null}
      onCancel={(e) => {
        e.stopPropagation();
        onCancel();
      }}
      visible={visible}
      destroyOnClose
    >
      <MoveTo moveToList={moveToList} onClose={onCancel} card={card} />
    </Modal>
  );
};
