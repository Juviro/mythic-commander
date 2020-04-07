import React, { useState } from 'react';
import styled from 'styled-components';

import { Popover } from 'antd';
import { getImageUrl } from '../../../../utils/cardImage';
import FullscreenCardModal from '../../Mobile/FullscreenCardModal';
import CustomSkeleton from '../CustomSkeleton';
import FlippableCard from '../FlippableCard';

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

export default ({ width, height, card, highlightOnHover }) => {
  const [cardPreviewOpen, setCardPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id, imgKey } = card;

  const onChangeIsOpen = event => {
    event.stopPropagation();
    setCardPreviewOpen(!cardPreviewOpen);
  };

  const previewImage = (
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
  );

  if (!highlightOnHover) {
    return (
      <>
        {previewImage}
        <FullscreenCardModal
          visible={cardPreviewOpen}
          card={card}
          onChangeIsOpen={onChangeIsOpen}
        />
      </>
    );
  }

  return (
    <Popover
      content={
        <div
          style={{
            width: 330,
            height: 460,
          }}
        >
          <FlippableCard card={card} hideFlipIcon />
        </div>
      }
      placement="right"
    >
      {previewImage}
    </Popover>
  );
};
