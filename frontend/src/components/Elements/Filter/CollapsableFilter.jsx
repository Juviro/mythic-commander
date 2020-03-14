import React from 'react';
import { Collapse } from 'antd';
import { FilterTwoTone } from '@ant-design/icons';

import Filter from './Filter';

export default () => {
  return null;
  return (
    <Collapse
      style={{ width: '100%', marginTop: 8, backgroundColor: 'white' }}
      expandIconPosition="right"
      expandIcon={() => <FilterTwoTone />}
    >
      <Collapse.Panel key="1" header="Filter">
        <Filter />
      </Collapse.Panel>
    </Collapse>
  );
};
