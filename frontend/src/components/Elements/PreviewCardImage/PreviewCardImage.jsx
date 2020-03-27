import React, { useState } from 'react';
import styled from 'styled-components';

import { getImageUrl } from '../../../utils/cardImage';
import FullscreenCardModal from '../FullscreenCardModal';
import CustomSkeleton from '../CustomSkeleton';

const StyledCard = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledPreviewWrapper = styled.div`
  position: relative;
  width: ${({ width = '36px' }) => width};
  height: ${({ height = '48px' }) => height};
`;

export default ({ width, height, card }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id, imgKey } = card;

  const onChangeIsOpen = event => {
    event.stopPropagation();
    setCardPreviewOpen(!cardPreviewOpen);
  };
  return (
    <>
      <StyledPreviewWrapper
        width={width}
        height={height}
        onClick={onChangeIsOpen}
      >
        <StyledCard
          src={getImageUrl(id, imgKey)}
          onLoad={() => setLoading(false)}
        />
        {loading && <CustomSkeleton.CardImage />}
      </StyledPreviewWrapper>
      <FullscreenCardModal
        visible={cardPreviewOpen}
        card={card}
        onChangeIsOpen={onChangeIsOpen}
      />
    </>
  );
};
