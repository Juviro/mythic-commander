import React from 'react';
import { Modal } from 'antd';
import useBlockShortcuts from '../../../Hooks/useBlockShortcuts';
import { useShortcut } from '../../../Hooks';
import SimpleCardsList from '../SimpleCardsList';

export default ({
  onCancel,
  cardsToDelete,
  numberOfSelectedCards,
  onDelete,
}) => {
  useBlockShortcuts();
  useShortcut('ENTER', onDelete, true);
  if (!cardsToDelete.length) return null;

  const title = `Delete ${numberOfSelectedCards} ${
    numberOfSelectedCards === 1 ? 'card' : 'cards'
  } from your collection?`;

  return (
    <Modal
      visible
      title={title}
      okText="Delete"
      okButtonProps={{ type: 'danger', onClick: onDelete }}
      onCancel={onCancel}
      bodyStyle={{ maxHeight: 400, overflowY: 'auto' }}
    >
      <SimpleCardsList cards={cardsToDelete} />
    </Modal>
  );
};
