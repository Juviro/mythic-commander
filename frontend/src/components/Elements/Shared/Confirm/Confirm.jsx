import React from 'react';
import { Typography } from 'antd';

import { useShortcut } from '../../../Hooks';
import FocusedModal from '../FocusedModal';

export default ({ onCancel, title, text, onOk, okText = 'Confirm', visible = true }) => {
  useShortcut('ENTER', onOk, 'modal.confirm');

  return (
    <FocusedModal
      visible={visible}
      title={title}
      okText={okText}
      okButtonProps={{ onClick: onOk }}
      onCancel={onCancel}
      bodyStyle={{ display: 'none', maxHeight: 400, overflowY: 'auto' }}
      focusId="modal.confirm"
    >
      {text && <Typography.Text>{text}</Typography.Text>}
    </FocusedModal>
  );
};
