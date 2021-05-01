import React from 'react';

import { UnifiedDeck } from 'types/unifiedTypes';
import { ValueLabel } from 'components/Elements/Shared';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const DeckValue = ({ deck }: Props) => {
  return (
    <DeckStat title="Estimated Value:">
      <ValueLabel list={deck} />
    </DeckStat>
  );
};
