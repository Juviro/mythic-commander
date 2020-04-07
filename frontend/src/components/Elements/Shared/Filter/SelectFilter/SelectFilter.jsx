import React, { useState, useEffect } from 'react';

import { AutoComplete } from 'antd';
import { StringParam, useQueryParam } from 'use-query-params';
import CustomSkeleton from '../../CustomSkeleton';

const SelectFilter = ({ paramName, options, placeholder }) => {
  const inputRef = React.useRef(null);
  const unifiedOptions = options.map(option => {
    if (option.value) return option;
    return {
      value: option,
      name: option,
    };
  });
  const [param, setParam] = useQueryParam(paramName, StringParam);
  const initialValue = unifiedOptions.find(
    ({ value: optionValue }) => optionValue === param
  );
  const [value = '', setValue] = useState(
    initialValue ? initialValue.name : ''
  );

  useEffect(() => {
    if (!param) setValue('');
  }, [param]);

  const filteredOptions = unifiedOptions
    .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()))

    .map(({ name, value: optionValue }) => (
      <AutoComplete.Option value={optionValue} key={optionValue}>
        {name}
      </AutoComplete.Option>
    ));

  const onSelect = (_, { key, children: optionValue }) => {
    setParam(key);
    setValue(optionValue);
    setTimeout(() => inputRef.current.blur(), 100);
  };

  return (
    <AutoComplete
      size="small"
      value={value}
      allowClear
      ref={inputRef}
      defaultActiveFirstOption
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={val => {
        setValue(val);
        setParam('');
      }}
      onSelect={onSelect}
    >
      {filteredOptions}
    </AutoComplete>
  );
};

// Wrap around loader so default value is set correctly
// even if options are not loaded from provider yet
export default ({ paramName, options, placeholder }) => {
  if (!options.length) return <CustomSkeleton.Line />;

  return (
    <SelectFilter
      paramName={paramName}
      options={options}
      placeholder={placeholder}
    />
  );
};
