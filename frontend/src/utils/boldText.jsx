import React from 'react';

export default text => {
  const textParts = text.split(/[()]+/g);

  const displayedMessage = textParts.map((part, index) => {
    // eslint-disable-next-line react/no-array-index-key
    if (index % 2) return <i key={index}>{part}</i>;
    // eslint-disable-next-line react/no-array-index-key
    return <span key={index}>{part}</span>;
  });

  return displayedMessage;
};
