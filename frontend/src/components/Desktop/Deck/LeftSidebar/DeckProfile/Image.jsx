import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';

const StyledDeckImage = styled.img`
  width: 100%;
  height: auto;
`;

const ImageWrapper = styled.div`
  width: 190px;
  height: 139px;
  display: block;
  overflow: hidden;
  border-radius: 5px;
`;

export default ({ onChangeImage, deck }) => {
  const onDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const onDrop = e => {
    const imgSrc = e.dataTransfer.getData('imgSrc');
    if (!imgSrc) return;
    onChangeImage(imgSrc);
  };

  return (
    <Tooltip
      title="Drag a card image here to change the deck cover"
      placement="right"
    >
      <ImageWrapper>
        <StyledDeckImage
          src={deck.imgSrc}
          alt={deck.name}
          onDragOver={onDragOver}
          onDrop={onDrop}
          draggable={false}
        />
      </ImageWrapper>
    </Tooltip>
  );
};
