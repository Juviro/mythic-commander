import React from 'react';
import styled from 'styled-components';

import { ADVANCED_SEARCH } from 'components/Desktop/Deck/ActionBar/ActionButtons/ActionButtons';
import { PlusOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import useCreateWantsList from 'components/Desktop/Deck/Sidebar/Tabs/useCreateWantsList';
import Tab from './Tab';

const ADD_WANTS_LIST = 'ADD_WANTS_LIST';

const StyledWrapper = styled.div`
  user-select: none;
  position: absolute;
  left: -40px;
  top: -2px;
  display: flex;
  flex-wrap: wrap;
  z-index: 9999;

  transform: rotate(90deg) translateY(-100%);
  transform-origin: left top;

  width: calc(100vh - 50px);
  height: 40px;

  @media (max-width: 1600px) {
    width: calc(100vh - 125px);
  }
`;

export default ({ deck, setCurrentTabId, currentTabId }) => {
  const { onCreateWantsList } = useCreateWantsList(deck, setCurrentTabId);
  const wantsListsTabs = deck?.wantsLists?.map(({ id, name, numberOfCards }) => ({
    title: `${name} (${numberOfCards})`,
    wantsList: { id, name },
    id,
  }));

  const advancedSearch = {
    title: 'Advanced Search',
    id: ADVANCED_SEARCH,
    isSecondary: true,
  };
  const addWantsList = {
    title: (
      <Space>
        <span>Add Wants List</span>
        <PlusOutlined />
      </Space>
    ),
    id: ADD_WANTS_LIST,
  };
  const tabs = [advancedSearch, ...wantsListsTabs, addWantsList];

  const onClickTab = (tabId) => {
    if (tabId === ADD_WANTS_LIST) {
      onCreateWantsList();
    } else {
      setCurrentTabId(tabId);
    }
  };

  return (
    <StyledWrapper>
      {tabs.map(({ title, id, isSecondary, wantsList }, index) => (
        <Tab
          index={index}
          key={id}
          title={title}
          wantsList={wantsList}
          isSecondary={isSecondary}
          active={id === currentTabId}
          onClick={() => onClickTab(id)}
        />
      ))}
    </StyledWrapper>
  );
};
