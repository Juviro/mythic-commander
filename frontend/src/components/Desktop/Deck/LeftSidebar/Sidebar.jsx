import React from 'react';
import { Collapse } from 'antd';

import {
  HomeOutlined,
  PlusOutlined,
  LineChartOutlined,
  UnorderedListOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import FilterHeader from '../../../Elements/Shared/Filter/FilterHeader';
import { Filter } from '../../../Elements/Shared';
import AddCards from './AddCards';
import DeckProfile from './DeckProfile';
import Actions from './Actions';

const { Panel } = Collapse;

export default ({ deck }) => {
  if (!deck) return null;
  const panels = [
    {
      key: 'overview',
      header: 'Overview',
      icon: <HomeOutlined />,
      component: <DeckProfile deck={deck} />,
    },
    {
      key: 'filter',
      header: <FilterHeader />,
      component: <Filter />,
    },
    {
      key: 'addCards',
      header: 'Add Cards',
      icon: <PlusOutlined />,
      component: <AddCards />,
    },
    {
      key: 'stats',
      header: 'Stats',
      icon: <LineChartOutlined />,
      component: (
        <div>
          Money, Amount, cmc stats, cards per type : (Owned, Unowned, Total)
        </div>
      ),
    },
    {
      key: 'resourceOverview',
      header: 'Resource Overview',
      icon: <UnorderedListOutlined />,
      component: <div>Number or ramp, carddraw, removal etc</div>,
    },
    {
      key: 'actions',
      header: 'Actions',
      icon: <EllipsisOutlined />,
      component: <Actions />,
    },
  ];
  return (
    <div style={{ width: 300 }}>
      <Collapse
        bordered={false}
        defaultActiveKey={panels[0].key}
        style={{ width: 300, fontSize: '14px', fontWeight: 900 }}
      >
        {panels.map(({ header, component, icon, key }) => (
          <Panel header={header} key={key} extra={icon}>
            {component}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
