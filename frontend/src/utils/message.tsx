import React from 'react';
import { message } from 'antd';

export default (text: string, type: string = 'success') => {
  const textParts = text.split(/<[/]*b>/g);

  const displayedMessage = textParts.map((part, index) => {
    // eslint-disable-next-line react/no-array-index-key
    if (index % 2) return <b key={index}>{part}</b>;
    // eslint-disable-next-line react/no-array-index-key
    return <span key={index}>{part}</span>;
  });

  message[type](displayedMessage);
};
