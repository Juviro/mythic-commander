import React from 'react';
import styled from 'styled-components';

const StyledCover = styled.img`
  width: 100%;
  height: 150px;
`;

const StyledCoverLetter = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 100px;
  color: #484848;
  opacity: 0.9;
  border-bottom: 1px solid #f0f0f0;
`;

const getColorFromId = id => {
  const possibleColors = [
    '#e57373',
    '#f06292',
    '#ba68c8',
    '#9575cd',
    '#7986cb',
    '#64b5f6',
    '#4fc3f7',
    '#4dd0e1',
    '#4db6ac',
    '#81c784',
    '#aed581',
    '#dce775',
    '#fff176',
    '#ffd54f',
    '#ffb74d',
    '#ff8a65',
  ];
  const index = id % possibleColors.length;
  return possibleColors[index];
};

export default ({ list }) => {
  const { imgSrc, name, id } = list;
  if (!imgSrc) {
    return (
      <StyledCoverLetter style={{ backgroundColor: getColorFromId(id) }}>
        {name.slice(0, 1)}
      </StyledCoverLetter>
    );
  }

  return <StyledCover src={imgSrc} crossOrigin="" />;
};
