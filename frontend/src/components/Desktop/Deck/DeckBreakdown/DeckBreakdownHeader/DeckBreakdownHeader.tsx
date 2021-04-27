import { Space } from 'antd';
import React from 'react';

import DeckQuickstats from 'components/Elements/Shared/DeckQuickstats';
import { UnifiedDeck } from 'types/unifiedTypes';
import DeckImage from './DeckImage';

interface Props {
  deck?: UnifiedDeck;
}

export const DeckBreakdownHeader = ({ deck }: Props) => {
  return (
    <Space style={{ alignItems: 'flex-start' }} size={16}>
      <DeckImage deck={deck} />
      <DeckQuickstats deck={deck} />
    </Space>
  );
};
