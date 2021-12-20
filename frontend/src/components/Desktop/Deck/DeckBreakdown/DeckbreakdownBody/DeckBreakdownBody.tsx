import React from 'react';

import { UnifiedDeck } from 'types/unifiedTypes';
import FeatureFlag from 'components/Elements/Shared/FeatureFlag';
import { FEATURE_FLAG_TAG } from 'constants/featureFlags';
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
      <FeatureFlag flag={FEATURE_FLAG_TAG}>
        <DeckTagDistribution deck={deck} />
      </FeatureFlag>
    </>
  );
};
