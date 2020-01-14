import React from 'react';
import { Collapse, Icon } from 'antd';

import AddCards from './AddCards';
import Filter from '../../../Elements/Filter';
import FilterHeader from './FilterHeader';
import DeckProfile from './DeckProfile';

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
      component: <AddCards deckId={deck.id} />,
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
      component: <div>Add deck to Collection; Delete Deck; </div>,
    },
  ];
  return (
    <div style={{ width: 300 }}>
      <Collapse
        bordered={false}
        defaultActiveKey={panels[0].icon}
        // defaultActiveKey={panels.map(panel => panel.icon || panel.key)}
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
