import React, { useContext } from 'react';

import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default () => {
  const { sets } = useContext(CardContext);
  const allSets = Object.keys(sets)
    .map(key => ({ value: key, ...sets[key] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <SelectFilter
      options={allSets}
      paramName="set"
      placeholder="Search for a set"
    />
  );
};
