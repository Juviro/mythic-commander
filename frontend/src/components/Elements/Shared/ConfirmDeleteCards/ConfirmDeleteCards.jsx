import React from 'react';

import { useShortcut } from '../../../Hooks';
import SimpleCardsList from '../SimpleCardsList';
import FocussedModal from '../FocussedModal';

export default ({
  onCancel,
  cardsToDelete,
  numberOfSelectedCards,
  onDelete,
}) => {
  useShortcut('ENTER', onDelete, 'modal.confirmDeleteCards');
  if (!cardsToDelete.length) return null;

  const title = `Delete ${numberOfSelectedCards} ${
    numberOfSelectedCards === 1 ? 'card' : 'cards'
  }?`;

  return (
    <FocussedModal
      visible
      title={title}
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onDelete }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
      focusId="modal.confirmDeleteCards"
    >
      <SimpleCardsList cards={cardsToDelete} />
    </FocussedModal>
  );
};
