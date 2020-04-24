import React from 'react';
import { Collapse } from 'antd';
import { FilterTwoTone, FilterOutlined } from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';

import Filter from './Filter';

export default ({
  advancedSearch,
  onSearch,
  hideNameFilter,
  options,
  onChangeOption,
}) => {
  const [filter] = useQueryParams({
    name: StringParam,
    colors: StringParam,
    creatureType: StringParam,
    cardType: StringParam,
    isLegendary: StringParam,
  });
  const defaultOpen = Object.values(filter)
    .filter(param => !hideNameFilter && param === filter.name)
    .some(Boolean);

  return (
    <Collapse
      style={{ width: '100%', marginTop: 8, backgroundColor: 'white' }}
      expandIconPosition="right"
      expandIcon={() => <FilterTwoTone />}
      defaultActiveKey={defaultOpen ? '1' : undefined}
    >
      <Collapse.Panel key="1" header="Filter" expandIcon={<FilterOutlined />}>
        <Filter
          onSearch={onSearch}
          advancedSearch={advancedSearch}
          hideNameFilter={hideNameFilter}
          options={options}
          onChangeOption={onChangeOption}
        />
      </Collapse.Panel>
    </Collapse>
  );
};
