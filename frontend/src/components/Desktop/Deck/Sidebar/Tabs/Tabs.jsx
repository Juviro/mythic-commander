import React from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import { useShortcut } from '../../../../Hooks';

const StyledWrapper = styled.div`
  margin-right: 8px;
`;

export default ({ currentTab, setCurrentTab }) => {
  const tabs = [
    {
      title: 'Add Cards [A]',
      key: 'add',
    },
    {
      title: 'Wants [W]',
      key: 'wants',
    },
    {
      title: 'Stats [S]',
      key: 'stats',
    },
  ];

  const onOpenTab = key => {
    if (key === currentTab) {
      setCurrentTab(null);
    } else {
      setCurrentTab(key);
    }
  };

  useShortcut('a', () => onOpenTab('add'), ['deck.sidebar', 'deck.cards']);
  useShortcut('w', () => onOpenTab('wants'), ['deck.sidebar', 'deck.cards']);
  useShortcut('s', () => onOpenTab('stats'), ['deck.sidebar', 'deck.cards']);

  return (
    <StyledWrapper>
      {tabs.map(({ title, key }, index) => (
        <Tab
          index={index}
          key={key}
          title={title}
          active={key === currentTab}
          onClick={() => onOpenTab(key)}
        />
      ))}
    </StyledWrapper>
  );
};
