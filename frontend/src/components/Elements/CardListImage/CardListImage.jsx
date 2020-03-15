import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import FlippableCard from '../FlippableCard';

const ANIMATION_TIME = 200;

const StyledCard = styled.img`
  height: auto;
  transition: all ${ANIMATION_TIME}ms;
  z-index: 5;
  will-change: width, margin-top;

  height: ${({ isLarge }) => (isLarge ? '70vw' : '36px')};
  width: ${({ isLarge }) => (isLarge ? 'calc(50vw - 8px)' : '26px')};
  margin-top: ${({ isLarge }) => (isLarge ? 36 : 0)}px;
`;

const StyledFlipWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 133vw;

  @media (min-width: 554px) {
    height: 724px;
  }
`;

const getImages = ({ image_uris, previewImg, card_faces }) => {
  if (previewImg) {
    return [
      {
        small: previewImg,
        normal: previewImg.replace('small', 'normal'),
      },
    ];
  }
  return image_uris ? [image_uris] : card_faces.map(card => card.image_uris);
};

export default ({ card, isOpen }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);
  const images = getImages(card);

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
        bodyStyle={{
          padding: 0,
        }}
        wrapClassName="transparent-modal"
        onCancel={onChangeIsOpen(false)}
      >
        <StyledFlipWrapper onClick={onChangeIsOpen(false)}>
          <FlippableCard cardImages={images} />
        </StyledFlipWrapper>
      </Modal>
    </>
  );
};
