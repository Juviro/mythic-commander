import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import SelectFilter from './SelectFilter';
import SetIcon from '../../SetIcon';

export default ({
  onChange,
  value,
  onSearch,
  allowClear,
  placeholder = 'e.g. "Theros"',
}) => {
  const { sets } = useContext(CardContext);
  const allSets = Object.keys(sets)
    .map((key) => ({ value: key, ...sets[key] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const getPrefix = (setKey) => <SetIcon setKey={setKey} />;

  return (
    <SelectFilter
      value={value}
      onSearch={onSearch}
      options={allSets}
      onChange={onChange}
      paramName="set"
      allowClear={allowClear}
      placeholder={placeholder}
      getPrefix={getPrefix}
    />
  );
};
