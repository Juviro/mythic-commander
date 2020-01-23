import React from 'react';
import styled from 'styled-components';

import { Tabs } from 'antd';
import CardList from './CardList';

const StyledDeck = styled.div`
  width: 100%;
  display: flex;
  min-height: 300px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default ({ deck, currentTab }) => {
  console.log('currentTab :', currentTab);
  return (
    <Tabs activeKey={currentTab} style={{ width: '100%' }} tabBarStyle={{ display: 'none' }}>
      <Tabs.TabPane tab="Tab 1" key="cards">
        <CardList deck={deck} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 2" key="stats">
        <CardList deck={deck} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 3" key="edit">
        <CardList deck={deck} />
      </Tabs.TabPane>
    </Tabs>
  );
};
