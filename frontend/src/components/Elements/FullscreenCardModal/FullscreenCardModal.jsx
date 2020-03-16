import React from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import FlippableCard from '../FlippableCard';

const StyledFlipWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 133vw;

  @media (min-width: 554px) {
    height: 724px;
  }
`;

export default ({ card, visible, onChangeIsOpen }) => {
  return (
    <Modal
      footer={null}
      closeIcon={<div />}
      visible={visible}
      bodyStyle={{
        padding: 0,
      }}
      wrapClassName="transparent-modal"
      onCancel={onChangeIsOpen}
    >
      <StyledFlipWrapper onClick={onChangeIsOpen}>
        <FlippableCard card={card} />
      </StyledFlipWrapper>
    </Modal>
  );
};
