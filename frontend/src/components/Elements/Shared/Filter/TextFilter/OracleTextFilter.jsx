import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, onChange, value }) => {
  return (
    <TextFilter
      placeholder="Undying, +1/+1 counter, ..."
      value={value}
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};
