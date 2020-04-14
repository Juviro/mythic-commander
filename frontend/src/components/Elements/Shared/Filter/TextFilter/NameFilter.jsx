import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, size, inputRef, placeholder = 'Card Name' }) => {
  return (
    <TextFilter
      size={size}
      paramName="name"
      placeholder={placeholder}
      onSearch={onSearch}
      inputRef={inputRef}
    />
  );
};
