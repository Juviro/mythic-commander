import React from 'react';
import styled from 'styled-components';

import { Popover } from 'antd';
import { getImageUrl } from '../../../../utils/cardImage';
import FullscreenCardModal from '../../Mobile/FullscreenCardModal';
import CustomSkeleton from '../CustomSkeleton';
import Card from '../Card';
import { useToggle } from '../../../Hooks';

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
  highlightOnHover = false,
}) => {
  const [cardPreviewOpen, toggleCardPreviewOpen] = useToggle(false);
  const [loading, toggleLoading] = useToggle(true);
  const { id, imgKey } = card;

  const onChangeIsOpen = (event) => {
    event.stopPropagation();
    toggleCardPreviewOpen();
  };

  const previewImage = (
    <StyledPreviewWrapper width={width} height={height} onClick={onChangeIsOpen}>
      <StyledCard src={getImageUrl(id, imgKey)} onLoad={() => toggleLoading(false)} />
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
          <Card card={card} />
        </div>
      }
      placement="right"
    >
      {previewImage}
    </Popover>
  );
};

const isEqual = (prevProps, nextProps) => {
  if (prevProps.width !== nextProps.width) return false;
  if (prevProps.height !== nextProps.height) return false;
  if (prevProps.highlightOnHover !== nextProps.highlightOnHover) return false;

  return ['id', 'imgKey'].every((propKey) => {
    return prevProps.card[propKey] === nextProps.card[propKey];
  });
};

export default React.memo(PreviewCardImage, isEqual);
