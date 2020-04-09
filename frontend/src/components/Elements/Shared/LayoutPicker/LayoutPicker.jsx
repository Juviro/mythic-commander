import React, { useEffect } from 'react';
import { Radio } from 'antd';
import {
  BarsOutlined,
  AppstoreOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import { StringParam, useQueryParam } from 'use-query-params';
import { useShortcut } from '../../../Hooks';
import { DesktopTooltip } from '../../Desktop';

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
  const [layout, setLayout] = useQueryParam('layout', StringParam);
  useShortcut('l', () => setLayout(getNextLayout(layout, hideCard)));

  useEffect(() => {
    if (!layout) setLayout('list');
  }, [layout, setLayout]);

  return (
    <DesktopTooltip title="Change Layout [L]">
      <Radio.Group value={layout} onChange={e => setLayout(e.target.value)}>
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
