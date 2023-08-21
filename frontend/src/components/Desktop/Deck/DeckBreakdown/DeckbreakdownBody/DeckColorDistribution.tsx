import React from 'react';

import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckStat } from './DeckStat';
import ColorDistributionChart from '../../../../Elements/Desktop/Charts/ColorDistributionChart';

interface Props {
  deck: UnifiedDeck;
}
export const DeckColorDistribution = ({ deck }: Props) => {
  return (
    <>
      <DeckStat title="Mana Symbols in Spells" hidden={!deck?.cards.length}>
        <ColorDistributionChart colorKey="mana_cost" deck={deck} />
      </DeckStat>
      <DeckStat title="Mana Production" hidden={!deck?.cards.length}>
        <ColorDistributionChart colorKey="produced_mana" deck={deck} />
      </DeckStat>
    </>
  );
};
