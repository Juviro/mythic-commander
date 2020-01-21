import React from 'react';
import { Spin, Popover, Tooltip } from 'antd';
import styled from 'styled-components';
import CardPreviewPopover from './CardPreview';

const StyledImage = styled.img`
  height: 36px;
  width: 26px;
  margin-top: -6px;
  position: absolute;
  ${({ shouldClip }) =>
    shouldClip && `clip-path: polygon(${shouldClip === 'top' ? '0 0, 0' : '100% 100%, 0'} 100%, 100% 0)`}
`;

const StyledPreviewWrapper = styled.div`
  height: 22px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const StyledCommanderTag = styled.span`
  position: absolute;
  background: linear-gradient(45deg, rgb(118, 98, 55), rgb(230, 205, 140), rgb(118, 98, 55));
  font-size: 25px;
  margin-left: -35px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardPreview = ({ card }) => {
  const { images } = card;

  const onDragStart = e => {
    const imgSrc = (card.card_faces ? card.card_faces[0] : card).image_uris.art_crop;
    e.dataTransfer.setData('imgSrc', imgSrc);
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  return (
    <StyledImageWrapper draggable onDragStart={onDragStart}>
      {images.map((image, index) => (
        <Popover
          placement="right"
          key={image.small}
          arrowPointAtCenter
          autoAdjustOverflow
          content={<CardPreviewPopover highlightedCard={card} />}
        >
          <StyledImage src={image.small} shouldClip={images.length === 1 ? false : index ? 'bottom' : 'top'} />
        </Popover>
      ))}
    </StyledImageWrapper>
  );
};

const CommanderTag = () => {
  return (
    <Tooltip title="Commander">
      <StyledCommanderTag>&#x2605;</StyledCommanderTag>
    </Tooltip>
  );
};

export default ({ card }) => {
  const hasImageUrl = card.images[0].small;
  const isCommander = card.zone === 'COMMANDER';

  return (
    <StyledPreviewWrapper>
      {isCommander && <CommanderTag />}
      {hasImageUrl ? <CardPreview card={card} size="small" /> : <Spin />}
    </StyledPreviewWrapper>
  );
};
