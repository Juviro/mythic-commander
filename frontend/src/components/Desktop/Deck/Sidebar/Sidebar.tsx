import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { CardInputType } from 'types/graphql';
import { UnifiedDeck } from 'types/unifiedTypes';
import { Drawer } from 'antd';
import Tabs from './Tabs';
import { Flex, ShortcutFocus } from '../../../Elements/Shared';
import AddCards from './AddCards/AddCards';
import DeckWants from './DeckWants';
import FocusContext from '../../../Provider/FocusProvider/FocusProvider';
import { primary } from '../../../../constants/colors';

export const DECK_SIDEBAR_WIDTH = 560;

interface Props {
  currentTabId: string | null;
  setCurrentTabId: (newTabId: string) => void;
  onAddCards: (newCards: CardInputType[], name: string) => void;
  deck?: UnifiedDeck;
}

export default ({ currentTabId, setCurrentTabId, onAddCards, deck }: Props) => {
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
  ];

  return (
    <Drawer
      width={600}
      mask={false}
      visible={Boolean(currentTabId)}
      onClose={() => setCurrentTabId(null)}
      zIndex={0}
      style={{ height: 'calc(100% - 125px)', marginTop: 48 }}
    >
      <AddCards onAddCards={onAddCards} deck={deck} visible />
    </Drawer>
  );
};
