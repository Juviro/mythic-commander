import React, { useEffect } from 'react';
import { ConnectDragPreview, DragPreviewImage } from 'react-dnd';

import { UnifiedCard } from 'types/unifiedTypes';
import { getImageUrl } from 'utils/cardImage';

interface Props {
  preview: ConnectDragPreview;
  card: UnifiedCard;
}

export const GridPreviewImage = ({ preview, card }: Props) => {
  useEffect(() => {
    if (!card) return;
    const img = new Image();
    img.src = getImageUrl(card.id, card.imgKey, 'small');
    img.width = 500;
    img.height = 500;
    // const ctx = document.createElement('canvas').getContext('2d');
    // ctx.canvas.width = 500;
    // ctx.canvas.height = 500;

    img.onload = () => {
      //   ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      //   img.src = ctx.canvas.toDataURL();
      preview(img);
    };
  }, [card.id]);

  return null;

  return (
    <DragPreviewImage
      connect={preview}
      src={getImageUrl(card.id, card.imgKey, 'small')}
    />
  );
};
