import React from 'react';
import { Radio } from 'antd';
import {
  BarsOutlined,
  AppstoreOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { StringParam } from 'use-query-params';
import { useShortcut, useStoredQueryParam } from '../../../Hooks';
import DesktopTooltip from '../../Desktop/DesktopTooltip';

const nextLayoutMap = {
  list: 'grid',
  grid: 'card',
  card: 'list',
};

const getNextLayout = (layout, hideCard) => {
  const nextLayout = nextLayoutMap[layout];
  if (hideCard && nextLayout === 'card') return 'list';
  return nextLayout;
};

export default ({ hideCard }) => {
  const [layout = 'list', setLayoutParam] = useStoredQueryParam(
    'layout',
    StringParam
  );
  const setLayout = newLayout => setLayoutParam(newLayout, 'replaceIn');
  useShortcut('l', () => setLayout(getNextLayout(layout, hideCard)));

  return (
    <DesktopTooltip title="Change Layout [L]">
      <Radio.Group
        value={layout}
        onChange={e => setLayout(e.target.value)}
        style={{ display: 'flex' }}
      >
        <Radio.Button value="list">
          <BarsOutlined />
        </Radio.Button>
        <Radio.Button value="grid">
          <AppstoreOutlined />
        </Radio.Button>
        {!hideCard && (
          <Radio.Button value="card">
            <BorderOutlined />
          </Radio.Button>
        )}
      </Radio.Group>
    </DesktopTooltip>
  );
};
