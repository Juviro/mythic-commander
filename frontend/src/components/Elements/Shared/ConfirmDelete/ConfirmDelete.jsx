import React from 'react';
import { Typography } from 'antd';

import { useShortcut } from '../../../Hooks';
import FocusedModal from '../FocusedModal';

export default ({ onCancel, text, onOk }) => {
  useShortcut('ENTER', onOk, { focusId: 'modal.confirmDelete' });

  return (
    <FocusedModal
      visible
      title="Are you sure?"
      okText="Delete"
      okButtonProps={{ danger: true, onClick: onOk }}
      onCancel={onCancel}
      styles={{
        body: { maxHeight: 400, overflowY: 'auto' },
      }}
      focusId="modal.confirmDelete"
    >
      <Typography.Text>{text}</Typography.Text>
    </FocusedModal>
  );
};
