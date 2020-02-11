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

export default ({ name, cardImages, loading }) => {
  const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // TODO: implement
  const [currentSide] = useState(0);

  if (loading)
    return (
      <CardWrapper>
        <CardSpinner />
      </CardWrapper>
    );

  const alt = name || 'card image';

  const { small, normal } = cardImages ? cardImages[currentSide] : {};

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
