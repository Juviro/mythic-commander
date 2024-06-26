import React from 'react';
import { Modal } from 'antd';

import styled from 'styled-components';
import Card from '../../Shared/Card';

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
      open={visible}
      styles={{
        body: {
          padding: 0,
          borderRadius: '4%',
          overflow: 'hidden',
        },
      }}
      wrapClassName="transparent-modal"
      onCancel={onChangeIsOpen}
    >
      <StyledFlipWrapper onClick={onChangeIsOpen}>
        <Card card={card} />
      </StyledFlipWrapper>
    </Modal>
  );
};
