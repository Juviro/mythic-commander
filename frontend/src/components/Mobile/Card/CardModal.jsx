import React from 'react';
import { Modal } from 'antd';

import { withRouter } from 'react-router';
import Card from '.';

const CardModal = ({ oracle_id, id, onClose, history }) => {
  if (!oracle_id) return null;

  window.onpopstate = onClose;

  return (
    <Modal
      visible
      footer={null}
      onCancel={history.goBack}
      bodyStyle={{ padding: '32px 0 0' }}
      className="fullscreen-modal"
    >
      <Card overwriteOracleId={oracle_id} defaultCardId={id} />
    </Modal>
  );
};

export default withRouter(CardModal);
