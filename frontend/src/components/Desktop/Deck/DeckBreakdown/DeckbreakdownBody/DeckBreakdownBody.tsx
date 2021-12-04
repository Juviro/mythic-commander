import React from 'react';

import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckCmc } from './DeckCmc';
import { DeckValue } from './DeckValue';
import { DeckColorDistribution } from './DeckColorDistribution';
import { DeckTypeDistribution } from './DeckTypeDistribution';
import { DeckTagDistribution } from './DeckTagDistribution';

interface Props {
  deck: UnifiedDeck;
}

export const DeckBreakdownBody = ({ deck }: Props) => {
  if (!deck) return null;

  return (
    <>
      <DeckValue deck={deck} />
      <DeckCmc deck={deck} />
      <DeckTypeDistribution deck={deck} />
      <DeckColorDistribution deck={deck} />
      <DeckTagDistribution deck={deck} />
    </>
  );
};
