import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch }) => {
  return (
    <TextFilter
      paramName="name"
      placeholder="Filter by name"
      onSearch={onSearch}
    />
  );
};
