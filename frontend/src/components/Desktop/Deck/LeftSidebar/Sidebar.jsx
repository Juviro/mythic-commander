import React from 'react';
import { Collapse, Icon } from 'antd';

import FilterHeader from './Filter/FilterHeader';
import Filter from '../../../Elements/Filter';
import AddCards from './AddCards';
import DeckProfile from './DeckProfile';
import Actions from './Actions';

const { Panel } = Collapse;

export default ({ deck }) => {
  if (!deck) return null;
  const panels = [
    {
      header: 'Overview',
      icon: 'home',
      component: <DeckProfile deck={deck} />,
    },
    {
      key: 'filter',
      header: <FilterHeader />,
      component: <Filter />,
    },
    {
      header: 'Add Cards',
      icon: 'plus',
      component: <AddCards />,
    },
    {
      header: 'Stats',
      icon: 'line-chart',
      component: <div>Money, Amount, cmc stats, cards per type : (Owned, Unowned, Total) </div>,
    },
    {
      header: 'Resource Overview',
      icon: 'unordered-list',
      component: <div>Number or ramp, carddraw, removal etc</div>,
    },
    {
      header: 'Actions',
      icon: 'ellipsis',
      component: <Actions />,
    },
  ];
  return (
    <div style={{ width: 300 }}>
      <Collapse
        bordered={false}
        defaultActiveKey={panels[0].icon}
        // defaultActiveKey={panels.map(({icon, key}) => icon || key)}
        style={{ width: 300, fontSize: '14px', fontWeight: 900 }}
      >
        {panels.map(({ header, component, icon, key }) => (
          <Panel header={header} key={icon || key} extra={icon && <Icon type={icon} />}>
            {component}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
