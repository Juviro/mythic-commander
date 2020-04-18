import React from 'react';
import TextFilter from './TextFilter';

export default ({
  onSearch,
  size,
  inputRef,
  autoFocus,
  placeholder = 'Black Lotus, Blacker Lotus ...',
}) => {
  return (
    <TextFilter
      size={size}
      paramName="name"
      placeholder={placeholder}
      autoFocus={autoFocus}
      onSearch={onSearch}
      inputRef={inputRef}
    />
  );
};
