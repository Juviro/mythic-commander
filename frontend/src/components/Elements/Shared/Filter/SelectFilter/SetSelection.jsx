import React, { useContext } from 'react';

import CardContext from '../../../../CardProvider/CardProvider';
import SelectFilter from './SelectFilter';

export default ({ onChange, value }) => {
  const { sets } = useContext(CardContext);
  const allSets = Object.keys(sets)
    .map(key => ({ value: key, ...sets[key] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <SelectFilter
      value={value}
      options={allSets}
      onChange={onChange}
      paramName="set"
      placeholder="Gatecrash, Zendikar..."
    />
  );
};
