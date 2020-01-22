import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const StyledImage = styled.img`
  height: 100%;
  ${({ shouldClip }) =>
    shouldClip && `clip-path: polygon(${shouldClip === 'top' ? '0 0, 0' : '100% 100%, 0'} 100%, 100% 0);`}

  ${({ shouldClip }) => (shouldClip === 'bottom' ? 'transform: translateX(-26px);' : '')}
`;

const StyledImageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const StyledIconWrapper = styled.div`
  height: 36px;
  width: 26px;
  display: flex;
`;

export default ({ card, displayBothSides }) => {
  const images = card.image_uris ? [card.image_uris] : card.card_faces.map(({ image_uris }) => image_uris);
  const hasImageUrl = images[0].small;

  if (hasImageUrl && !displayBothSides) {
    return (
      <StyledIconWrapper>
        <StyledImage src={images[0].small} />
      </StyledIconWrapper>
    );
  }

  return (
    <>
      {hasImageUrl ? (
        images.map((image, index) => (
          <StyledIconWrapper key={image.small}>
            <StyledImageWrapper>
              <StyledImage src={image.small} shouldClip={images.length === 1 ? false : index ? 'bottom' : 'top'} />
            </StyledImageWrapper>
          </StyledIconWrapper>
        ))
      ) : (
        <Spin />
      )}
    </>
  );
};
