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
      okButtonProps={{ type: 'danger', onClick: onOk }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
      focusId="modal.confirmDelete"
    >
      <Typography.Text>{text}</Typography.Text>
    </FocusedModal>
  );
};
