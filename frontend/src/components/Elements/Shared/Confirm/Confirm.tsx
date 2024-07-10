import React from 'react';
import { Typography } from 'antd';

import { useShortcut } from '../../../Hooks';
import FocusedModal from '../FocusedModal';

interface Props {
  title: React.ReactNode;
  text?: React.ReactNode;
  okText?: string;
  visible?: boolean;
  onCancel: () => void;
  onOk: () => void;
}

export default ({
  onCancel,
  title,
  text,
  onOk,
  okText = 'Confirm',
  visible = true,
}: Props) => {
  useShortcut('ENTER', onOk, { focusId: 'modal.confirm' });

  return (
    <FocusedModal
      visible={visible}
      title={title}
      okText={okText}
      okButtonProps={{ onClick: onOk }}
      onCancel={onCancel}
      styles={{
        body: { display: text ? 'block' : 'none', maxHeight: 400, overflowY: 'auto' },
      }}
      focusId="modal.confirm"
    >
      {text && <Typography.Text>{text}</Typography.Text>}
    </FocusedModal>
  );
};
