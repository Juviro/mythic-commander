import React, { useContext } from 'react';

import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default () => {
  const { creatureTypes } = useContext(CardContext);

  return (
    <SelectFilter
      options={creatureTypes}
      paramName="creatureType"
      placeholder="Creature Type"
    />
  );
};
