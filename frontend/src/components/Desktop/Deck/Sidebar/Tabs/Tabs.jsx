import React from 'react';
import styled from 'styled-components';

import { ADVANCED_SEARCH } from 'components/Desktop/Deck/ActionBar/ActionButtons/ActionButtons';
import Tab from './Tab';

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
  const tabs = [advancedSearch, ...wantsListsTabs];

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
          onClick={() => setCurrentTabId(id)}
        />
      ))}
    </StyledWrapper>
  );
};
