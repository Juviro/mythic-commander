import React, { useContext } from 'react';
import styled from 'styled-components';
import Tab from './Tab';
import { useShortcut } from '../../../../Hooks';
import FocusContext from '../../../../Provider/FocusProvider/FocusProvider';

const StyledWrapper = styled.div`
  margin-right: 8px;
`;

export default ({ currentTab, setCurrentTab }) => {
  const { addFocus } = useContext(FocusContext);
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
      addFocus('deck.sidebar');
    }
  };

  const focusIds = [
    'deck.sidebar.add',
    'deck.sidebar.wants',
    'deck.sidebar.stats',
    'deck.cards',
  ];

  useShortcut('a', () => onOpenTab('add'), focusIds);
  useShortcut('w', () => onOpenTab('wants'), focusIds);
  useShortcut('s', () => onOpenTab('stats'), focusIds);

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
