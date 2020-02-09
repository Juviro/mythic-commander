import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardSpinner from '../Card/CardSpinner';

const CardWrapper = styled.div`
  width: 90vw;
  height: 120vw;
  display: flex;
  position: relative;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
  margin-top: 16px;
`;

export default ({ card }) => {
  const cardImages = card.image_uris || card.card_faces[0].image_uris;
  const [currentImageSize, setCurrentImageSize] = useState('small');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentImageSize('normal');
      setIsLoading(false);
    };

    img.src = cardImages.normal;
  }, [cardImages.normal]);

  const imgSrc = cardImages[currentImageSize];

  return (
    <CardWrapper>
      <StyledImage alt={card.name} src={imgSrc} />
      {isLoading && <CardSpinner />}
    </CardWrapper>
  );
};
