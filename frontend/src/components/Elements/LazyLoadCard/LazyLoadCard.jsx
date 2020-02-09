import React, { useState } from 'react';
import styled from 'styled-components';
import CardSpinner from '../Card/CardSpinner';

const CardWrapper = styled.div`
  width: 90vw;
  height: 120vw;
  display: flex;
  margin-top: 16px;
  position: relative;
  border-radius: 11px;
  align-items: center;
  justify-content: center;
  ${({ hidden }) => (hidden ? 'height: 0;' : '')}
`;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;
`;

export default ({ card }) => {
  const cardImages = card
    ? card.image_uris || card.card_faces[0].image_uris
    : {};
  const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const alt = (card && card.name) || 'card image';

  const { small, normal } = cardImages;

  return (
    <CardWrapper>
      {!isLargeImageLoaded && small && (
        <StyledImage alt={alt} src={small} onLoad={() => setIsLoading(false)} />
      )}
      {normal && (
        <StyledImage
          alt={alt}
          src={normal}
          hidden={!isLargeImageLoaded}
          onLoad={() => {
            setIsLoading(false);
            setIsLargeImageLoaded(true);
          }}
          onError={() => setIsLoading(false)}
        />
      )}
      {isLoading && <CardSpinner />}
    </CardWrapper>
  );
};
