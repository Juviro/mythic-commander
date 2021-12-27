import React from 'react';
import styled from 'styled-components';

import { lightBackground } from 'constants/colors';
import shimmer from 'components/Animations/shimmer';

const StyledCardPreview = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2px;
  position: absolute;
  background-color: white;
`;

const StyledPreview = styled.div`
  width: 100%;
  height: 100%;
  ${shimmer}
`;

const StyledCardPreviewImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-color: ${lightBackground};
  background: ${({ imageUrl }) => (imageUrl ? `url(${imageUrl})` : undefined)};
  background-size: cover;
`;

interface Props {
  cardPreviews: string[] | null;
}

const SplitCover = ({ cardPreviews }: Props) => {
  const paddedList = [...cardPreviews, '', '', '', ''].slice(0, 4);

  return (
    <StyledCardPreview>
      {paddedList.map((src) => (
        <StyledPreview key={src || Math.random().toString()}>
          <StyledCardPreviewImage imageUrl={src} />
        </StyledPreview>
      ))}
    </StyledCardPreview>
  );
};

export default SplitCover;
