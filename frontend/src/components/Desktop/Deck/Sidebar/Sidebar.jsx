import React from 'react';
import styled from 'styled-components';

import Tabs from './Tabs';
import { Flex, ShortcutFocus } from '../../../Elements/Shared';

const StyledWrapper = styled.div`
  z-index: 10;
  transition: all 0.2s;
  box-shadow: 5px 5px 5px -5px #333;
  width: ${({ visible }) => (visible ? 400 : 0)}px;
  display: flex;
  overflow: hidden;
`;

export default ({ currentTab, setCurrentTab }) => {
  return (
    <Flex direction="row" style={{ userSelect: 'none' }}>
      <ShortcutFocus
        visible={Boolean(currentTab)}
        focusId="deck.sidebar"
        style={{ display: 'flex', position: 'relative' }}
      >
        <StyledWrapper visible={Boolean(currentTab)}>
          <div>lalala</div>
        </StyledWrapper>
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </ShortcutFocus>
    </Flex>
  );
};
