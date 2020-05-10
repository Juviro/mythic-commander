import React from 'react';
import { Select } from 'antd';
import { useQueryParam, NumberParam } from 'use-query-params';

const options = [
  {
    label: 'Added last hour',
    value: 1,
  },
  {
    label: 'Added last day',
    value: 24,
  },
  {
    label: 'Added last 7 days',
    value: 24 * 7,
  },
  {
    label: 'Added last 12 month',
    value: 24 * 365,
  },
];

export default () => {
  const [addedWithin, setAddedWithing] = useQueryParam(
    'addedWithin',
    NumberParam
  );

  const currentOption = options.find(({ value }) => value === addedWithin);

  const currentValue = currentOption && currentOption.label;

  const onChange = val => {
    if (val) return;
    setAddedWithing(undefined);
  };

  return (
    <Select
      allowClear
      listHeight={390}
      value={currentValue}
      placeholder="Show recently added..."
      dropdownStyle={{ minWidth: 200 }}
      onSelect={value => setAddedWithing(value)}
      style={{ width: 200, marginLeft: 16 }}
      onChange={onChange}
    >
      {options.map(({ label, value }) => (
        <Select.Option value={value} key={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
