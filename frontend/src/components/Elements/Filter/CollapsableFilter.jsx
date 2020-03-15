import React from 'react';
import { Collapse } from 'antd';
import { FilterTwoTone } from '@ant-design/icons';
import { useQueryParams, StringParam } from 'use-query-params';

import Filter from './Filter';

export default () => {
  const [{ search, colors }] = useQueryParams({
    search: StringParam,
    colors: StringParam,
  });
  const defaultOpen = search || colors;

  // TODO: allow reset
  return (
    <Collapse
      style={{ width: '100%', marginTop: 8, backgroundColor: 'white' }}
      expandIconPosition="right"
      expandIcon={() => <FilterTwoTone />}
      defaultActiveKey={defaultOpen ? '1' : undefined}
    >
      <Collapse.Panel key="1" header="Filter">
        <Filter />
      </Collapse.Panel>
    </Collapse>
  );
};
