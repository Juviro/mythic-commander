import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { CardInputType } from 'types/graphql';
import Tabs from './Tabs';
import { Flex, ShortcutFocus } from '../../../Elements/Shared';
import AddCards from './AddCards/AddCards';
import DeckStats from './DeckStats';
import DeckWants from './DeckWants';
import FocusContext from '../../../Provider/FocusProvider/FocusProvider';
import { primary } from '../../../../constants/colors';
import { UnifiedDeck } from '../Deck';

const StyledOuterWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledWrapper = styled.div<{ visible: boolean; currentTabIndex: number }>`
  z-index: 10;
  box-shadow: 5px 5px 5px -5px #333;
  display: flex;
  overflow: hidden;
  height: 300%;
  transition: all 0.3s;
  flex-direction: column;
  width: 500px;
  margin-left: ${({ visible }) => (visible ? 0 : -500)}px;
  transform: translateY(-${({ currentTabIndex }) => (100 / 3) * currentTabIndex}%);
`;

const StyledView = styled.div<{ visible: boolean }>`
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

const StyledFocus = styled.div<{ focused: boolean }>`
  min-height: 100%;
  ${({ focused }) =>
    focused
      ? css`
          box-shadow: inset 0 0 10px 3px ${primary};
        `
      : ''}
`;

interface Props {
  currentTab: string | null;
  setCurrentTab: (newTabId: string) => void;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck: UnifiedDeck;
}

export default ({ currentTab, setCurrentTab, onAddCards, deck }: Props) => {
  const { focusedElement } = useContext(FocusContext);
  const tabs = [
    {
      Component: AddCards,
      props: { onAddCards, deck },
      key: 'add',
    },
    {
      Component: DeckWants,
      props: { onAddCards, deck },
      key: 'wants',
    },
    {
      Component: DeckStats,
      key: 'stats',
    },
  ];

  return (
    <StyledOuterWrapper>
      <Flex
        direction="row"
        style={{
          height: '100%',
          overflowY: 'hidden',
          boxShadow: '2px 0px 4px 0px #9c9c9c',
        }}
      >
        <StyledWrapper
          visible={Boolean(currentTab)}
          currentTabIndex={tabs.findIndex(({ key }) => key === currentTab)}
        >
          {tabs.map(({ key, Component, props }) => (
            <ShortcutFocus
              key={key}
              style={{ height: '100%', overflow: 'auto' }}
              focusId={`deck.sidebar.${key}`}
            >
              <StyledView visible={currentTab === key}>
                <StyledFocus focused={`deck.sidebar.${key}` === focusedElement}>
                  <Component visible={currentTab === key} {...props} />
                </StyledFocus>
              </StyledView>
            </ShortcutFocus>
          ))}
        </StyledWrapper>
      </Flex>
      <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </StyledOuterWrapper>
  );
};
