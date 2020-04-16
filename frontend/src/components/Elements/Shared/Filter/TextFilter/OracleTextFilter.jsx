import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch }) => {
  return (
    <TextFilter
      paramName="text"
      placeholder="Undying, +1/+1 counter, ..."
      onSearch={onSearch}
    />
  );
};
