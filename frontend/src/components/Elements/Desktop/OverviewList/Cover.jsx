import React from 'react';
import styled from 'styled-components';

import shimmer from 'components/Animations/shimmer';
import SplitCover from 'components/Elements/Shared/SplitCover/SplitCover';
import DeckStatus from 'components/Elements/Desktop/OverviewList/DeckStatus/DeckStatus';
import { addBaseUrlToImg } from 'utils/cardImage';
import DeckCoverLetter from './DeckCoverLetter';

const StyledWrapper = styled.div`
  width: 100%;
  padding-bottom: 73.5%;
  position: relative;
  ${shimmer};
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const StyledCoverLetter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 100px;
`;

export default ({ list }) => {
  const { imgSrc, name, id, cardPreviews, status } = list;

  const getCover = () => {
    if (imgSrc) {
      return <StyledImage src={addBaseUrlToImg(imgSrc)} />;
    }

    if (cardPreviews?.length) {
      return <SplitCover cardPreviews={cardPreviews} />;
    }

    return (
      <StyledCoverLetter>
        <DeckCoverLetter name={name} id={id} />
      </StyledCoverLetter>
    );
  };

  return (
    <StyledWrapper>
      {getCover()}
      <DeckStatus status={status} deckId={id} deckName={name} />
    </StyledWrapper>
  );
};
