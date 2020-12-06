import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, onChange, value, size }) => {
  return (
    <TextFilter
      placeholder={'e.g. "Undying"'}
      value={value}
      size={size}
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};
