import React from 'react';
import { Radio } from 'antd';
import {
  BarsOutlined,
  AppstoreOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { StringParam, useQueryParam } from 'use-query-params';

export default () => {
  const [layout = 'list', setLayout] = useQueryParam('layout', StringParam);

  return (
    <Radio.Group
      value={layout}
      onChange={e => setLayout(e.target.value)}
      style={{ width: 138 }}
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
  );
};
