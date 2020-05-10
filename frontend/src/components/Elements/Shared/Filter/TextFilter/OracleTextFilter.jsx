import React from 'react';
import TextFilter from './TextFilter';

export default ({ onSearch, onChange, value }) => {
  return (
    <TextFilter
      placeholder={'e.g. "Undying"'}
      value={value}
      onSearch={onSearch}
      onChange={onChange}
    />
  );
};
