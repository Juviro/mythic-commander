import React, { useContext } from 'react';

import CardContext from '../../../../Provider/CardProvider';
import MultiSelectFilter from './MultiSelectFilter';
import SetIcon from '../../SetIcon';

const SetSelection = ({
  onChange,
  value,
  allowClear,
  size,
  onSearch,
  placeholder = 'e.g. "Theros"',
}) => {
  const { sets } = useContext(CardContext);
  const allSets = Object.keys(sets)
    .map((key) => ({ value: key, ...sets[key] }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const getPrefix = (setKey) => <SetIcon setKey={setKey} />;

  return (
    <MultiSelectFilter
      value={value}
      size={size}
      onSearch={onSearch}
      options={allSets}
      onChange={onChange}
      allowClear={allowClear}
      placeholder={placeholder}
      getPrefix={getPrefix}
    />
  );
};

export default SetSelection;
