import React from 'react';
import styled from 'styled-components';

import Tabs from './Tabs';
import { Flex, ShortcutFocus } from '../../../Elements/Shared';
import AddCards from './AddCards/AddCards';
import DeckStats from './DeckStats';
import DeckWants from './DeckWants';

const StyledWrapper = styled.div`
  z-index: 10;
  transition: all 0.2s;
  box-shadow: 5px 5px 5px -5px #333;
  display: flex;
  overflow: hidden;
  height: 300%;
  transition: all 0.3s;
  flex-direction: column;
  width: ${({ visible }) => (visible ? 500 : 0)}px;
  transform: translateY(
    -${({ currentTabIndex }) => (100 / 3) * currentTabIndex}%
  );
`;

const StyledView = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export default ({ currentTab, setCurrentTab }) => {
  const tabs = [
    {
      Component: AddCards,
      key: 'add',
    },
    {
      Component: DeckWants,
      key: 'wants',
    },
    {
      Component: DeckStats,
      key: 'stats',
    },
  ];
  return (
    <Flex
      direction="row"
      style={{ userSelect: 'none', position: 'relative', overflow: 'hidden' }}
    >
      <StyledWrapper
        visible={Boolean(currentTab)}
        currentTabIndex={tabs.findIndex(({ key }) => key === currentTab)}
      >
        {tabs.map(({ key, Component }) => (
          <ShortcutFocus
            visible={currentTab === key}
            focusId={`deck.sidebar.${key}`}
            style={{ height: '100%' }}
            key={key}
          >
            <StyledView visible={currentTab === key}>
              <Component visible={currentTab === key} />
            </StyledView>
          </ShortcutFocus>
        ))}
      </StyledWrapper>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </Flex>
  );
};
