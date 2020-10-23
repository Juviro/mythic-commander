import React from 'react';
import FocusedModal from '../FocusedModal';
import AddCardsTo from './AddCardsTo';

export default ({ onCancel, visible, ...props }) => {
  return (
    <FocusedModal
      visible={visible}
      title="Add cards to..."
      footer={null}
      onCancel={onCancel}
      destroyOnClose
      width={666}
      focusId="modal.addCardsTo"
      bodyStyle={{ maxHeight: '70vh', overflowY: 'auto', padding: 16 }}
    >
      <AddCardsTo {...props} />
    </FocusedModal>
  );
};
