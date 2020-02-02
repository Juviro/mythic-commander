import React from 'react';
import { Popover } from 'antd';
import styled from 'styled-components';

import CardPreviewPopover from './CardPreviewPopover';
import CardIcon from './CardIcon';

const DraggableWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export default ({ card }) => {
  const onDragStart = e => {
    const imgSrc = (card.card_faces ? card.card_faces[0] : card).image_uris
      .art_crop;
    e.dataTransfer.setData('imgSrc', imgSrc);
    e.dataTransfer.effectAllowed = 'copyMove';
  };

  return (
    <>
      <Popover
        placement="right"
        key={card.id}
        arrowPointAtCenter
        autoAdjustOverflow
        content={<CardPreviewPopover card={card} />}
      >
        <DraggableWrapper draggable onDragStart={onDragStart}>
          <CardIcon card={card} displayBothSides />
        </DraggableWrapper>
      </Popover>
    </>
  );
};
