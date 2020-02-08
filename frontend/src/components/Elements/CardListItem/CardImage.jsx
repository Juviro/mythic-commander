import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const ANIMATION_TIME = 200;

const StyledCard = styled.img`
  height: auto;
  transition: all ${ANIMATION_TIME}ms;
  z-index: 5;
  will-change: width, margin-top;

  width: ${({ isLarge }) => (isLarge ? 'calc(50vw - 8px)' : '26px')};
  margin-top: ${({ isLarge }) => (isLarge ? 36 : 0)}px;
`;

const StyledFullscreenCard = styled.img`
  width: 100%;
  border-radius: 16px;
`;

export default ({ card, isOpen }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);
  const images = card.image_uris
    ? [card.image_uris]
    : card.card_faces.map(({ image_uris }) => image_uris);

  const largeImageSrc = images[0].normal;

  const onChangeIsOpen = previewVisible => event => {
    event.stopPropagation();
    setCardPreviewOpen(previewVisible);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowHighResImage(true), ANIMATION_TIME);
    } else {
      setShowHighResImage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const img = new Image();
    img.src = largeImageSrc;
  }, [largeImageSrc]);

  return (
    <>
      <StyledCard
        src={images[0][showHighResImage ? 'normal' : 'small']}
        isLarge={isOpen}
        onClick={onChangeIsOpen(true)}
      />
      <Modal
        footer={null}
        closeIcon={<div />}
        visible={cardPreviewOpen}
        bodyStyle={{ padding: 1, backgroundColor: '#17140f' }}
        onCancel={onChangeIsOpen(false)}
      >
        <StyledFullscreenCard
          src={images[0].normal}
          onClick={onChangeIsOpen(false)}
        />
      </Modal>
    </>
  );
};
