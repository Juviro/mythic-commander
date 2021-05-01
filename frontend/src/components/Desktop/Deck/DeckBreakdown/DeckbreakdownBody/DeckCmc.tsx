import React from 'react';
import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckStat } from './DeckStat';

interface Props {
  deck: UnifiedDeck;
}

export const DeckCmc = ({ deck }: Props) => {
  return <DeckStat title="Mana Value:">BEAUTIFUL CMC CHART</DeckStat>;
};
