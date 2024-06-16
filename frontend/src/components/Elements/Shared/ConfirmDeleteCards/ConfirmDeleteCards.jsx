import React from 'react';

import { useShortcut } from '../../../Hooks';
import SimpleCardsList from '../SimpleCardsList';
import FocusedModal from '../FocusedModal';

export default ({ onCancel, cardsToDelete, numberOfSelectedCards, onDelete }) => {
  useShortcut('ENTER', onDelete, { focusId: 'modal.confirmDeleteCards' });
  if (!cardsToDelete.length) return null;

  const title = `Delete ${numberOfSelectedCards} ${
    numberOfSelectedCards === 1 ? 'card' : 'cards'
  }?`;

  return (
    <FocusedModal
      visible
      centered
      title={title}
      okText="Delete"
      okButtonProps={{ type: 'primary', danger: true, onClick: onDelete }}
      onCancel={onCancel}
      styles={{
        body: { maxHeight: 400, overflowY: 'auto' },
      }}
      focusId="modal.confirmDeleteCards"
    >
      <SimpleCardsList cards={cardsToDelete} />
    </FocusedModal>
  );
};
