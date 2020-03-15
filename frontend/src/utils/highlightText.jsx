import React from 'react';

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
    return <b key={Math.random()}>{char}</b>;
  });

  return highlightedoption;
};
