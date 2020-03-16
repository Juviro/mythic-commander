import React from 'react';
import { Radio, Select } from 'antd';
import {
  BarsOutlined,
  AppstoreOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';
import styled from 'styled-components';

const StyledListOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 16px;
  width: 100%;
`;

export default () => {
  const [
    { layout = 'list', orderBy = 'added-desc' },
    setFilter,
  ] = useQueryParams({
    layout: StringParam,
    orderBy: StringParam,
  });

  const orderOptions = [
    {
      label: 'Added (last added first)',
      value: 'added-desc',
    },
    {
      label: 'Added (last added last)',
      value: 'added-asc',
    },
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
    {
      label: 'Number collected (lowest first)',
      value: 'amount-asc',
    },
    {
      label: 'Number collected (highest first)',
      value: 'amount-desc',
    },
    {
      label: 'Search result',
      value: 'search',
    },
  ];

  return (
    <StyledListOrder>
      <Select
        defaultValue={orderOptions.find(({ value }) => value === orderBy).label}
        style={{ width: 215 }}
        onSelect={value => setFilter({ orderBy: value })}
      >
        {orderOptions.map(({ label, value }) => (
          <Select.Option value={value} key={value}>
            {label}
          </Select.Option>
        ))}
      </Select>
      <Radio.Group
        value={layout}
        onChange={e => setFilter({ layout: e.target.value })}
      >
        <Radio.Button value="list">
          <BarsOutlined />
        </Radio.Button>
        <Radio.Button value="grid">
          <AppstoreOutlined />
        </Radio.Button>
        <Radio.Button value="card">
          <BorderOutlined />
        </Radio.Button>
      </Radio.Group>
    </StyledListOrder>
  );
};
