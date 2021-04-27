import shimmer from 'components/Animations/shimmer';
import { coverBackgroundColors } from 'constants/colors';
import React from 'react';
import styled from 'styled-components';

const StyledCoverLetterWrapper = styled.div`
  padding-bottom: 73%;
  font-size: 100px;
  color: #484848;
  opacity: 0.9;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
`;

const StyledCoverLetter = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
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

const getColorFromId = (id) => {
  const stringAsNumber = id
    .split('')
    .map((char) => char.charCodeAt(0).toString(10))
    .reduce((acc, val) => acc + Number(val), 0);
  const index = stringAsNumber % coverBackgroundColors.length;
  return coverBackgroundColors[index];
};

export default ({ list }) => {
  const { imgSrc, name, id } = list;

  if (!imgSrc) {
    return (
      <StyledCoverLetterWrapper>
        <StyledCoverLetter color={getColorFromId(id)}>
          {name.slice(0, 1)}
        </StyledCoverLetter>
      </StyledCoverLetterWrapper>
    );
  }

  return (
    <StyledWrapper>
      <StyledImage src={imgSrc} alt={name} />
    </StyledWrapper>
  );
};
