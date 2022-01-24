import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import MultiSelectFilter from './MultiSelectFilter';

export default ({ onChangeOption, value, size }) => {
  const { cardTypes } = useContext(CardContext);

  return (
    <MultiSelectFilter
      size={size}
      value={value}
      onChange={onChangeOption('cardTypes')}
      options={cardTypes}
      placeholder={'e.g. "Planeswalker"'}
    />
  );
};
