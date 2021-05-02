import React from 'react';

import { UnifiedDeck } from 'types/unifiedTypes';
import { DeckCmc } from './DeckCmc';
import { DeckValue } from './DeckValue';
import { DeckTypeDistribution } from './DeckTypeDistribution';

interface Props {
  deck: UnifiedDeck;
}

export const DeckBreakdownBody = ({ deck }: Props) => {
  return (
    <>
      <DeckValue deck={deck} />
      <DeckCmc deck={deck} />
      <DeckTypeDistribution deck={deck} />
    </>
  );
};
