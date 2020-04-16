import React from 'react';
import TextFilter from './TextFilter';

export default ({
  onSearch,
  size,
  inputRef,
  placeholder = 'Black Lotus, Blacker Lotus ...',
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
