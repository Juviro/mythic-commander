import React, { useContext } from 'react';

import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChange, value }) => {
  const { creatureTypes } = useContext(CardContext);

  return (
    <SelectFilter
      options={creatureTypes}
      onChange={onChange}
      value={value}
      paramName="creatureType"
      placeholder="Shark, Bird, ..."
    />
  );
};
