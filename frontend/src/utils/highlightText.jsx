import React from 'react';
import styled from 'styled-components';

const StyledBoldLetter = styled.span`
  font-weight: 700;
`;

export const highlightText = (searchString, option) => {
  if (!searchString) return option;

  const searchTerms = searchString.toLowerCase().split(' ');
  let remainingOption = option;
  const optionChars = [];

  searchTerms.forEach(searchTerm => {
    const startingIndex = remainingOption.toLowerCase().indexOf(searchTerm);
    const termLength = searchTerm.length;
    let i = 0;

    while (i < startingIndex + termLength) {
      const currentChar = remainingOption[0];
      if (i < startingIndex) {
        optionChars.push(currentChar);
      } else {
        optionChars.push(
          <StyledBoldLetter key={Math.random()}>{currentChar}</StyledBoldLetter>
        );
      }

      remainingOption = remainingOption.slice(1);
      i++;
    }
  });

  const remainingText = remainingOption.split('');
  return optionChars.concat(remainingText);
};
