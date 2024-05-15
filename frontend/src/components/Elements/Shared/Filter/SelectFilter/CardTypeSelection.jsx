import React from 'react';

import { SUPER_TYPES } from 'components/Provider/CardProvider/staticTypes';
import MultiSelectFilter from './MultiSelectFilter';

export default ({ onChangeOption, value, size, onSearch }) => {
  return (
    <MultiSelectFilter
      size={size}
      value={value}
      onSearch={onSearch}
      onChange={onChangeOption}
      options={SUPER_TYPES}
      placeholder={'e.g. "Planeswalker"'}
    />
  );
};
