import React, { useState } from 'react';
import EditCardBody from './EditCardBody';
import FocusedModal from '../FocusedModal';

const EditCardModal = ({ onEdit, card, onCancel, allowSettingDefaultCardVersion }) => {
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
      centered
      width={660}
      okText="Save"
      okButtonProps={{
        disabled: !canSubmit,
        onClick: onSubmit,
      }}
      focusId="modal.editCard"
      title={`Edit ${card.name}`}
      focusStyle={{ display: 'flex', width: 400, height: 400 }}
    >
      <EditCardBody
        card={card}
        allowSettingDefaultCardVersion={allowSettingDefaultCardVersion}
        onChangeProp={onChangeProp}
        canSubmit={canSubmit}
        onSubmit={onSubmit}
      />
    </FocusedModal>
  );
};

export default EditCardModal;
