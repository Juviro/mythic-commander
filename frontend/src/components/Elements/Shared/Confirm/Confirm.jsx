import React from 'react';
import { Typography } from 'antd';

import { useShortcut } from '../../../Hooks';
import FocussedModal from '../FocussedModal';

export default ({ onCancel, title, text, onOk, okText = 'Confirm' }) => {
  useShortcut('ENTER', onOk, 'modal.confirm');

  return (
    <FocussedModal
      visible
      title={title}
      okText={okText}
      okButtonProps={{ onClick: onOk }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
      focusId="modal.confirm"
    >
      <Typography.Text>{text}</Typography.Text>
    </FocussedModal>
  );
};
