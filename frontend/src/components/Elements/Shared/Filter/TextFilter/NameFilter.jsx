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
  placeholder = 'Sol Ring, Lili Veil, ...',
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
