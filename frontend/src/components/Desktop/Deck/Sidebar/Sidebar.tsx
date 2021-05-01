import React from 'react';
import { Drawer } from 'antd';
import styled from 'styled-components';

import { CardInputType } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import DeckWants from './DeckWants';
import AddCards from './AddCards/AddCards';
import { ADVANCED_SEARCH, EDH_REC } from '../ActionBar/ActionButtons/ActionButtons';
import Tabs from './Tabs';
import { EDHRec } from './EDHRec/EDHRec';

const StyledDrawer = styled(Drawer)`
  && .ant-drawer-content {
    overflow: visible;
    @media (max-width: 1600px) {
      padding-bottom: 80px;
    }
  }
`;
interface Props {
  currentTabId: string | null;
  setCurrentTabId: (newTabId: string) => void;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

export default ({ currentTabId, setCurrentTabId, onAddCards, deck }: Props) => {
  return (
    <StyledDrawer
      width={510}
      mask={false}
      visible={Boolean(currentTabId)}
      onClose={() => setCurrentTabId(null)}
      zIndex={100}
      style={{
        height: 'calc(100% - 48px)',
        marginTop: 48,
        paddingBottom: 6,
        overflow: !currentTabId ? 'hidden' : undefined,
      }}
      bodyStyle={{ padding: 0 }}
      closeIcon={null}
    >
      {currentTabId && (
        <Tabs deck={deck} setCurrentTabId={setCurrentTabId} currentTabId={currentTabId} />
      )}
      <EDHRec deck={deck} visible={currentTabId === EDH_REC} />
      <AddCards
        onAddCards={onAddCards}
        deck={deck}
        visible={currentTabId === ADVANCED_SEARCH}
      />
      {deck?.wantsLists
        .filter(({ id }) => id === currentTabId)
        .map(({ id, name, numberOfCards }) => (
          <DeckWants
            name={name}
            key={id}
            deck={deck}
            id={id}
            onAddCards={onAddCards}
            numberOfCards={numberOfCards}
          />
        ))}
    </StyledDrawer>
  );
};
