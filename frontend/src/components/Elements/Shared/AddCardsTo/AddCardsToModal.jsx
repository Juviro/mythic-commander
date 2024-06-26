import React from 'react';
import FocusedModal from '../FocusedModal';
import AddCardsTo from './AddCardsTo';

export default ({ onCancel, title = 'Add cards to...', visible, ...props }) => {
  return (
    <FocusedModal
      open={visible}
      title={title}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
      centered
      width={666}
      focusId="modal.addCardsTo"
      styles={{
        body: {
          maxHeight: '70vh',
          overflowY: 'auto',
          padding: 16,
        },
      }}
    >
      <AddCardsTo {...props} />
    </FocusedModal>
  );
};
