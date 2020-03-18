import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch }) => {
  return (
    <TextFilter
      paramName="text"
      placeholder="Search for oracle text"
      onSearch={onSearch}
    />
  );
};
