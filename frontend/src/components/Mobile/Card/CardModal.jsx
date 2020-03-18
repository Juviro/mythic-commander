import React from 'react';
import { Modal } from 'antd';
import { useParams } from 'react-router';
import Card from '.';

export default () => {
  const { oracle_id } = useParams();
  if (!oracle_id) return null;

  return (
    <Modal
      visible
      footer={null}
      closeIcon={<div />}
      bodyStyle={{ padding: 0 }}
      className="fullscreen-modal"
    >
      <Card />
    </Modal>
  );
};
