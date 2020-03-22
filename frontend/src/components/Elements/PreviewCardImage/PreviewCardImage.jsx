import React, { useState } from 'react';
import styled from 'styled-components';

import { getImageUrl } from '../../../utils/cardImage';
import FullscreenCardModal from '../FullscreenCardModal';

const StyledCard = styled.img`
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
`;

export default ({ width, height, card }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const { id, imgKey } = card;

  const onChangeIsOpen = event => {
    event.stopPropagation();
    setCardPreviewOpen(!cardPreviewOpen);
  };
  return (
    <>
      <StyledCard
        src={getImageUrl(id, imgKey)}
        width={width}
        height={height}
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
