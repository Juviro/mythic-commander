import React from 'react';
import styled from 'styled-components';

import { Popover } from 'antd';
import { NumberParam } from 'use-query-params';
import { getImageUrl } from '../../../../utils/cardImage';
import FullscreenCardModal from '../../Mobile/FullscreenCardModal';
import CustomSkeleton from '../CustomSkeleton';
import FlippableCard from '../FlippableCard';
import { useToggle, useStoredQueryParam } from '../../../Hooks';
import isMobile from '../../../../utils/isMobile';

const StyledCard = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const StyledPreviewWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const PreviewCardImage = ({
  width = 36,
  height = 48,
  card,
  highlightOnHover,
}) => {
  const [zoom] = useStoredQueryParam('zoom', NumberParam);
  const [cardPreviewOpen, toggleCardPreviewOpen] = useToggle(false);
  const [loading, toggleLoading] = useToggle(true);
  const { id, imgKey } = card;

  const scaledWidth = isMobile() ? width : width * (zoom / 100);
  const scaledHeight = isMobile() ? height : height * (zoom / 100);

  const onChangeIsOpen = event => {
    event.stopPropagation();
    toggleCardPreviewOpen();
  };

  const previewImage = (
    <StyledPreviewWrapper
      width={scaledWidth}
      height={scaledHeight}
      onClick={onChangeIsOpen}
    >
      <StyledCard
        src={getImageUrl(id, imgKey)}
        onLoad={() => toggleLoading(false)}
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

export default React.memo(PreviewCardImage);
