import React, { useContext, useState, useEffect } from 'react';

import { AutoComplete } from 'antd';
import { StringParam, useQueryParam } from 'use-query-params';
import CardContext from '../../CardProvider/CardProvider';

export default () => {
  const [selectedType, setSelectedType] = useQueryParam(
    'creatureType',
    StringParam
  );
  const [value = '', setValue] = useState(selectedType);
  const { creatureTypes } = useContext(CardContext);

  useEffect(() => {
    if (!selectedType) setValue('');
  }, [selectedType]);

  const options = creatureTypes
    .filter(type => type.toLowerCase().startsWith(value.toLowerCase()))
    .map(type => <AutoComplete.Option key={type}>{type}</AutoComplete.Option>);

  return (
    <AutoComplete
      size="small"
      value={value}
      allowClear
      defaultActiveFirstOption
      style={{ width: '100%' }}
      placeholder="Search for creature type"
      onChange={val => {
        setValue(val);
        if (!creatureTypes.includes(val)) setSelectedType('');
      }}
      onSelect={val => setSelectedType(val)}
    >
      {options}
    </AutoComplete>
  );
};
