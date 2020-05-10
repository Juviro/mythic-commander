import React from 'react';
import { Modal, Typography } from 'antd';

export default ({ onCancel, text, onOk }) => {
  return (
    <Modal
      visible
      title="Are you sure?"
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onOk }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
    >
      <Typography.Text>{text}</Typography.Text>
    </Modal>
  );
};
