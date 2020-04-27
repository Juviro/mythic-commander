import React from 'react';
import TextFilter from './TextFilter';

export default ({
  onSearch,
  size,
  inputRef,
  autoFocus,
  onChange,
  style,
  value,
  placeholder = 'Black Lotus, Blacker Lotus ...',
}) => {
  return (
    <TextFilter
      size={size}
      style={style}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      autoFocus={autoFocus}
      onSearch={onSearch}
      inputRef={inputRef}
    />
  );
};
