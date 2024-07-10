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
      items={[
        {
          key: 'cards',
          title: '1',
          children: <CardList deck={deck} loading={loading} />,
        },
        {
          key: 'wants',
          title: '2',
          children: <LinkedWants deck={deck} loading={loading} />,
        },
        {
          key: 'edit',
          title: '3',
          children: <EditDeck deck={deck} loading={loading} />,
        },
      ]}
    />
  );
};
