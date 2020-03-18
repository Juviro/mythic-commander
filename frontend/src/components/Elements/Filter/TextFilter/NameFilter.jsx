import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, size }) => {
  return (
    <TextFilter
      size={size}
      paramName="name"
      placeholder="Search for name"
      onSearch={onSearch}
    />
  );
};
