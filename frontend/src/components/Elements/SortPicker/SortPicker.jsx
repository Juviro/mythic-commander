import React, { useEffect } from 'react';
import { Select } from 'antd';
import { StringParam, useQueryParam } from 'use-query-params';

const DEFAULT_FILTER = [
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
  },
  {
    label: 'Name (Z-A)',
    value: 'name-desc',
  },
  {
    label: 'Price (lowest first)',
    value: 'price-asc',
  },
  {
    label: 'Price (highest first)',
    value: 'price-desc',
  },
  {
    label: 'Mana costs (lowest first)',
    value: 'cmc-asc',
  },
  {
    label: 'Mana costs (highest first)',
    value: 'cmc-desc',
  },
];

const COLLECTION_FILTER = [
  {
    label: 'Added (last added first)',
    value: 'added-desc',
  },
  {
    label: 'Added (last added last)',
    value: 'added-asc',
  },
  ...DEFAULT_FILTER,
  {
    label: 'Amount (lowest first)',
    value: 'amount-asc',
  },
  {
    label: 'Amount (highest first)',
    value: 'amount-desc',
  },
];

export default ({ showCollectionFilters, style }) => {
  const orderOptions = showCollectionFilters
    ? COLLECTION_FILTER
    : DEFAULT_FILTER;

  const [orderBy, setOrderBy] = useQueryParam('orderBy', StringParam);

  useEffect(() => {
    if (!orderBy) setOrderBy(orderOptions[0].value);
    // eslint-disable-next-line
  }, [orderBy]);

  const defaultValue = orderOptions.find(
    ({ value }) => value === (orderBy || orderOptions[0].value)
  ).label;

  return (
    <Select
      defaultValue={defaultValue}
      dropdownStyle={{ minWidth: 200 }}
      onSelect={value => setOrderBy(value)}
      style={{ width: 215, maxWidth: 'calc(100% - 140px)', ...style }}
    >
      {orderOptions.map(({ label, value }) => (
        <Select.Option value={value} key={value}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};
