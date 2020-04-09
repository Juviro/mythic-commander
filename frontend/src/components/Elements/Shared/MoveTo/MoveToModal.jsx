import React from 'react';
import { Modal } from 'antd';

import MoveTo from './MoveTo';

export default ({ moveToList, onCancel, visible, cardId }) => {
  return (
    <Modal
      centered
      footer={null}
      onCancel={e => {
        e.stopPropagation();
        onCancel();
      }}
      visible={visible}
      destroyOnClose
      title="Move card to other list"
    >
      <MoveTo moveToList={moveToList} onClose={onCancel} cardId={cardId} />
    </Modal>
  );
};
