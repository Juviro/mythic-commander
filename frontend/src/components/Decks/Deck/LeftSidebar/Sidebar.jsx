import React from 'react';
import { Collapse, Icon } from 'antd';
import AddCards from './AddCards';
import Filter from '../../../Elements/Filter';

const { Panel } = Collapse;

export default ({ deckId }) => {
  const panels = [
    {
      title: 'Search',
      icon: 'search',
      component: <Filter />,
    },
    {
      title: 'Add Cards',
      icon: 'plus',
      component: <AddCards deckId={deckId} />,
    },
    {
      title: 'Stats',
      icon: 'line-chart',
      component: <div>Money, Amount, cmc stats, cards per type : (Owned, Unowned, Total) </div>,
    },
    {
      title: 'Settings',
      icon: 'setting',
      component: <div>Set the commander and deck image here</div>,
    },
    {
      title: 'Resource Overview',
      icon: 'unordered-list',
      component: <div>Number or ramp, carddraw, removal etc</div>,
    },
  ];
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={panels[0].title}
      style={{ width: 300, fontSize: '14px', fontWeight: 900 }}
    >
      {panels.map(({ title, component, icon }) => (
        <Panel header={title} key={title} extra={<Icon type={icon} />}>
          {component}
        </Panel>
      ))}
    </Collapse>
  );
};
