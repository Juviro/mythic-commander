import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getImageUrl } from '../../../utils/cardImage';
import FullscreenCardModal from '../FullscreenCardModal/FullscreenCardModal';

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

export default ({ card, isOpen }) => {
  const { id, imgKey } = card;
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const [showHighResImage, setShowHighResImage] = useState(false);

  const largeImageSrc = getImageUrl(id, imgKey, 'normal');

  const onChangeIsOpen = event => {
    event.stopPropagation();
    setCardPreviewOpen(!cardPreviewOpen);
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
        src={getImageUrl(id, imgKey, showHighResImage ? 'normal' : 'small')}
        isLarge={isOpen}
        onClick={onChangeIsOpen}
      />
      <FullscreenCardModal
        visible={cardPreviewOpen}
        card={card}
        onChangeIsOpen={onChangeIsOpen}
      />
    </>
  );
};
