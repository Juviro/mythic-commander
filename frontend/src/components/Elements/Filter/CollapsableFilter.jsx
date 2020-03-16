import React from 'react';
import { Collapse } from 'antd';
import { FilterTwoTone } from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';

import Filter from './Filter';
import FilterHeader from '../../Desktop/Deck/LeftSidebar/Filter/FilterHeader';

export default () => {
  const [{ search, colors, creatureType }] = useQueryParams({
    search: StringParam,
    colors: StringParam,
    creatureType: StringParam,
  });
  const defaultOpen = search || colors || creatureType;

  return (
    <Collapse
      style={{ width: '100%', marginTop: 8, backgroundColor: 'white' }}
      expandIconPosition="right"
      expandIcon={() => <FilterTwoTone />}
      defaultActiveKey={defaultOpen ? '1' : undefined}
    >
      <Collapse.Panel key="1" header={<FilterHeader showIcon={false} />}>
        <Filter />
      </Collapse.Panel>
    </Collapse>
  );
};
