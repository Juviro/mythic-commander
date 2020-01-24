import React from 'react';

import { Tabs } from 'antd';
import CardList from './CardList';
import EditDeck from './EditDeck';

export default ({ deck, currentTab }) => {
  // TODO: try to only use these tabs instead of the current menu, wrap tab headers in affix
  return (
    <Tabs activeKey={currentTab} style={{ width: '100%' }} tabBarStyle={{ display: 'none' }}>
      <Tabs.TabPane tab="1" key="cards">
        <CardList deck={deck} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="2" key="stats">
        <CardList deck={deck} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="3" key="edit">
        <EditDeck deck={deck} />
      </Tabs.TabPane>
    </Tabs>
  );
};
