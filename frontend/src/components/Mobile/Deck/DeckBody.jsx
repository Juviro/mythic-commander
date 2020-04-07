import React from 'react';

import { Tabs } from 'antd';
import CardList from './CardList';
import EditDeck from './EditDeck';
import LinkedWants from './LinkedWants';

export default ({ deck, currentTab, loading }) => {
  return (
    <Tabs
      activeKey={currentTab}
      style={{ width: '100%' }}
      tabBarStyle={{ display: 'none' }}
    >
      <Tabs.TabPane tab="1" key="cards">
        <CardList deck={deck} loading={loading} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="2" key="wants">
        <LinkedWants deck={deck} loading={loading} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="3" key="edit">
        <EditDeck deck={deck} loading={loading} />
      </Tabs.TabPane>
    </Tabs>
  );
};
