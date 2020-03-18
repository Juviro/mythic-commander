import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch }) => {
  return (
    <TextFilter
      paramName="text"
      placeholder="Filter by oracle text"
      onSearch={onSearch}
    />
  );
};
