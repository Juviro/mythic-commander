import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

const ANIMATION_TIME = 200;

const opacity = 0.3;

const StyledCard = styled.div`
  height: ${({ isLarge }) => (isLarge ? '280' : '36')}px;
  width: 26px;
  transition: all ${ANIMATION_TIME}ms;
  z-index: 5;

  ${({ isLarge, img }) => {
    const multiplier = isLarge ? 10 : 1;
    return `
    background: repeating-linear-gradient(
      -45deg,
      rgba(255, 0, 0, ${opacity}) 0,
      rgba(255, 125, 0, ${opacity}) ${5 * multiplier}px,
      rgba(125, 125, 0, ${opacity}) ${10 * multiplier}px,
      rgba(125, 255, 0, ${opacity}) ${15 * multiplier}px,
      rgba(0, 255, 0, ${opacity}) ${20 * multiplier}px,
      rgba(0, 0, 255, ${opacity}) ${25 * multiplier}px,
      rgba(125, 125, 255, ${opacity}) ${30 * multiplier}px,
      rgba(255, 0, 255, ${opacity}) ${35 * multiplier}px,
      rgba(255, 0, 0, ${opacity}) ${40 * multiplier}px
    ),
    url(${img});
  `;
  }}

  background-blend-mode: overlay;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;

  ${({ isLarge }) => {
    if (!isLarge) return '';
    return `
      width: calc(50vw - 8px);
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
  const [showLargeImage, setShowLargeImage] = useState(false);
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
      setTimeout(() => setShowLargeImage(true), ANIMATION_TIME);
    } else {
      setShowLargeImage(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const img = new Image();
    img.src = largeImageSrc;
  }, [largeImageSrc]);

  return (
    <>
      <StyledCard
        img={images[0][showLargeImage ? 'normal' : 'small']}
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
