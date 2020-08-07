import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const StyledTestModal = styled.div`
  position: absolute;
  z-index: 99;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 2px;

  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

export default ({ player, onClose, visible, onSubmit }) => {
  //   return <StyledTestModal>{player.name}</StyledTestModal>;

  return (
    <Modal visible={visible} onCancel={onClose}>
      {player.name}
    </Modal>
  );
};
