import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, size, inputRef }) => {
  return (
    <TextFilter
      size={size}
      paramName="name"
      placeholder="Filter by card name"
      onSearch={onSearch}
      inputRef={inputRef}
    />
  );
};
