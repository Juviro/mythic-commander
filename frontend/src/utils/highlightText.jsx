import React from 'react';
import styled from 'styled-components';

const StyledBoldLetter = styled.span`
  font-weight: 700;
`;

export const highlightText = (searchString, option) => {
  if (!searchString) return option;
  let currentSearchString = searchString;
  const highlightedoption = option.split('').map(char => {
    if (
      !currentSearchString.length ||
      char.toLowerCase() !== currentSearchString[0].toLowerCase()
    ) {
      return char;
    }
    currentSearchString = currentSearchString.substr(1);
    return <StyledBoldLetter key={Math.random()}>{char}</StyledBoldLetter>;
  });

  return highlightedoption;
};
