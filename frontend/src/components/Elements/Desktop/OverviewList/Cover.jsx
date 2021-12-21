import React from 'react';
import styled from 'styled-components';

import shimmer from 'components/Animations/shimmer';
import { colorPalette, lightBackground } from 'constants/colors';

const StyledCoverLetter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 100px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

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

const StyledCardPreviewImage = styled.div.attrs(({ imageUrl }) => ({
  style: {
    background: imageUrl ? `url(${imageUrl})` : undefined,
  },
}))`
  width: 100%;
  height: 100%;
  background-color: ${lightBackground};
  background-size: contain !important;
`;

const getColorFromId = (id) => {
  const stringAsNumber = id
    .split('')
    .map((char) => char.charCodeAt(0).toString(10))
    .reduce((acc, val) => acc + Number(val), 0);
  const index = stringAsNumber % colorPalette.length;
  return colorPalette[index];
};

export default ({ list }) => {
  const { imgSrc, name, id, cardPreviews } = list;

  const getCover = () => {
    if (imgSrc) {
      return <StyledImage src={imgSrc} />;
    }

    if (cardPreviews?.length) {
      const paddedList = [...cardPreviews, null, null, null].slice(0, 4);

      return (
        <StyledCardPreview>
          {paddedList.map((src) => (
            <StyledCardPreviewImage
              imageUrl={src}
              key={src ?? Math.random().toString()}
            />
          ))}
        </StyledCardPreview>
      );
    }

    return (
      <StyledCoverLetter color={getColorFromId(id)}>{name.slice(0, 1)}</StyledCoverLetter>
    );
  };

  return <StyledWrapper>{getCover()}</StyledWrapper>;
};
