import React, { useState } from 'react';
import { Button, Space } from 'antd';
import styled from 'styled-components';

import { UnifiedDeck } from 'types/unifiedTypes';
import { CardInputType } from 'types/graphql';
import { WantsListsButton } from './WantsListsButton';
import Sidebar from '../../Sidebar';

export const ADVANCED_SEARCH = 'advanced_search';
export const EDH_REC = 'edh_rec';

const StyledWrapper = styled(Space)`
  display: flex;
  margin-left: 24px;
`;

const StyledButton = styled(Button)`
  height: 40px;
`;

interface Props {
  deck?: UnifiedDeck;
  onAddCards: (newCards: CardInputType[], name: string) => void;
}

export const ActionButtons = ({ deck, onAddCards }: Props) => {
  const [currentTabId, setCurrentTabId] = useState<string | null>(null);

  if (!deck) return null;

  const onSetTabId = (tabId: string) => {
    if (currentTabId === tabId) {
      setCurrentTabId(null);
    } else {
      setCurrentTabId(tabId);
    }
  };

  return (
    <>
      <StyledWrapper size={24}>
        <StyledButton
          ghost={currentTabId !== ADVANCED_SEARCH}
          type="primary"
          onClick={() => onSetTabId(ADVANCED_SEARCH)}
        >
          Advanced Search
        </StyledButton>
        <StyledButton
          ghost={currentTabId !== EDH_REC}
          type="primary"
          onClick={() => onSetTabId(EDH_REC)}
        >
          EDHREC Search
        </StyledButton>
        <WantsListsButton
          deck={deck}
          setCurrentTabId={onSetTabId}
          currentTabId={currentTabId}
        />
      </StyledWrapper>

      <Sidebar
        currentTabId={currentTabId}
        setCurrentTabId={onSetTabId}
        onAddCards={onAddCards}
        deck={deck}
      />
    </>
  );
};
