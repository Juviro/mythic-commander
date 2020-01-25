import React, { useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const StyledCard = styled.img`
  height: auto;
  width: 26px;
  max-width: 350px;
  max-height: 480px;
  transition: all 0.2s;
  z-index: 5;

  ${({ isLarge }) => {
    if (!isLarge) return '';
    return `
      width: 50vw;
      margin-top: 36px;
    `;
  }}
`;

const StyledFullscreenCard = styled.img`
  width: 100%;
  border-radius: 16px;
`;

export default ({ card, isOpen }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris);

  const onChangeIsOpen = previewVisible => event => {
    event.stopPropagation();
    setCardPreviewOpen(previewVisible);
  };

  return (
    <>
      <StyledCard src={images[0].normal} isLarge={isOpen} onClick={onChangeIsOpen(true)} />
      <Modal
        footer={null}
        closeIcon={<div />}
        visible={cardPreviewOpen}
        bodyStyle={{ padding: 1, backgroundColor: '#17140f' }}
        onCancel={onChangeIsOpen(false)}
      >
        <StyledFullscreenCard src={images[0].normal} onClick={onChangeIsOpen(false)} />
      </Modal>
    </>
  );
};
