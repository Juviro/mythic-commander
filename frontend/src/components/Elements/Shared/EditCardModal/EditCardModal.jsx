import React, { useState } from 'react';
import EditCardBody from './EditCardBody';
import FocusedModal from '../FocusedModal';

export default ({ onEdit, card, onCancel }) => {
  const [newProps, setNewProps] = useState({});

  const onSubmit = () => {
    onEdit(card.id, newProps);
    onCancel();
  };

  const onChangeProp = (key) => (value) => {
    setNewProps({
      ...newProps,
      [key]: value,
    });
  };

  const canSubmit = Boolean(Object.keys(newProps).length);

  return (
    <FocusedModal
      onCancel={onCancel}
      visible
      width={660}
      okText="Save"
      okButtonProps={{
        disabled: !canSubmit,
        onClick: onSubmit,
      }}
      focusId="modal.editCard"
      focusStyle={{ display: 'flex', width: 400, height: 400 }}
    >
      <EditCardBody
        card={card}
        onChangeProp={onChangeProp}
        canSubmit={canSubmit}
        onSubmit={onSubmit}
      />
    </FocusedModal>
  );
};
