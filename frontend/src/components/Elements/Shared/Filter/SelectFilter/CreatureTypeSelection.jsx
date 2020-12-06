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
      options={options}
      onChange={onChange}
      size={size}
      value={value}
      onSearch={onSearch}
      paramName="subType"
      placeholder={'e.g. "Shrine"'}
    />
  );
};
