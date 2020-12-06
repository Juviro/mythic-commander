import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChangeOption, value, onSearch, size }) => {
  const { cardTypes } = useContext(CardContext);

  return (
    <SelectFilter
      size={size}
      onSearch={onSearch}
      value={value}
      onChange={onChangeOption('cardType')}
      options={cardTypes}
      placeholder={'e.g. "Planeswalker"'}
    />
  );
};
