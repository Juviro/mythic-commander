import React from 'react';
import { Typography } from 'antd';

import { useShortcut } from '../../../Hooks';
import FocussedModal from '../FocussedModal';

export default ({ onCancel, text, onOk }) => {
  useShortcut('ENTER', onOk, 'modal.confirmDelete');

  return (
    <FocussedModal
      visible
      title="Are you sure?"
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onOk }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
      focusId="modal.confirmDelete"
    >
      <Typography.Text>{text}</Typography.Text>
    </FocussedModal>
  );
};
