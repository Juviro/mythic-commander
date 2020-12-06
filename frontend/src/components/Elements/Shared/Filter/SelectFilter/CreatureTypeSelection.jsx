import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChange, value, onSearch, size }) => {
  const { creatureTypes } = useContext(CardContext);

  return (
    <SelectFilter
      options={creatureTypes}
      onChange={onChange}
      size={size}
      value={value}
      onSearch={onSearch}
      paramName="creatureType"
      placeholder={'e.g. "Brushwagg"'}
    />
  );
};
