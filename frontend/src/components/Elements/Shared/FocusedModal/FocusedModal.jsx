import React from 'react';
import { Modal } from 'antd';

import ShortcutFocus from '../ShortcutFocus';

export default ({ focusId, visible, children, ...modalProps }) => {
  return (
    <Modal open={visible} {...modalProps}>
      <ShortcutFocus focusId={focusId} visible={visible}>
        {children}
      </ShortcutFocus>
    </Modal>
  );
};
