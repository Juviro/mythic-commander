import React from 'react';
import { Modal } from 'antd';
import { useParams, withRouter } from 'react-router';
import Card from '.';

const CardModal = ({ visible = true, history }) => {
  const { oracle_id } = useParams();
  if (!oracle_id) return null;

  const onClose = () => {
    const match = history.location.pathname.match(/\/m\/([-a-z]+)/);
    const basePath = match ? match[1] : 'cards';
    history.replace(`/m/${basePath}${history.location.search}`);
  };

  return (
    <Modal
      footer={null}
      closeIcon={<div />}
      visible={visible}
      bodyStyle={{ padding: 0 }}
      className="fullscreen-modal"
      onCancel={onClose}
    >
      <Card />
    </Modal>
  );
};

export default withRouter(CardModal);
