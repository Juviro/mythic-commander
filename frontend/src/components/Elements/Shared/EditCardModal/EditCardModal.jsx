import React, { useState } from 'react';
import { Modal } from 'antd';
import EditCardBody from './EditCardBody';

export default ({ onEdit, card, onCancel }) => {
  const [newProps, setNewProps] = useState({});

  const onSubmit = () => {
    onEdit(card.id, newProps);
    onCancel();
  };

  const onChangeProp = key => value => {
    setNewProps({
      ...newProps,
      [key]: value,
    });
  };

  const canSubmit = Boolean(Object.keys(newProps).length);

  return (
    <Modal
      onCancel={onCancel}
      visible
      width={660}
      okText="Save"
      okButtonProps={{
        disabled: !canSubmit,
        onClick: onSubmit,
      }}
    >
      <EditCardBody
        card={card}
        onChangeProp={onChangeProp}
        canSubmit={canSubmit}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};
