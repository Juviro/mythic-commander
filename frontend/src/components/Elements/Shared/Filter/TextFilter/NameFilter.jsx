import React from 'react';
import TextFilter from './TextFilter';

export default ({
  onSearch,
  size,
  inputRef,
  placeholder = 'Filter by card name',
}) => {
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
