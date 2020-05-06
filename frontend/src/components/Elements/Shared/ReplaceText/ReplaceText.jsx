import React from 'react';

const ReplaceText = ({
  text,
  replacementPattern,
  textFormatter = e => e,
  replacementFunction,
}) => {
  let remainingText = text;
  let overflow = 0;
  const elements = [];

  while (remainingText.length && overflow < 10) {
    overflow++;
    const indexOfNextIcon = remainingText.search(replacementPattern);

    if (indexOfNextIcon === -1) {
      elements.push(textFormatter(remainingText));
      remainingText = '';
    } else if (indexOfNextIcon > 0) {
      const unmatchedText = remainingText.slice(0, indexOfNextIcon);
      elements.push(textFormatter(unmatchedText));
      remainingText = remainingText.substr(indexOfNextIcon);
    } else {
      const foundElement = remainingText.match(replacementPattern)[0];
      remainingText = remainingText.substr(foundElement.length);
      elements.push(replacementFunction(textFormatter(foundElement)));
    }
  }

  return (
    <>
      {elements.map(element => (
        <span key={Math.random()}>{element}</span>
      ))}
    </>
  );
};

export default React.memo(ReplaceText);
