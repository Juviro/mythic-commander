import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import MultiSelectFilter from './MultiSelectFilter';

export default ({ onChange, value, onSearch, size }) => {
  const { subTypes } = useContext(CardContext);
  const options = subTypes.map(({ category, types }) => ({
    label: category,
    options: types,
  }));

  return (
    <MultiSelectFilter
      isGrouped
      options={options}
      onChange={onChange}
      size={size}
      value={value}
      onSearch={onSearch}
      paramName="subTypes"
      placeholder={'e.g. "Shrine"'}
    />
  );
};
