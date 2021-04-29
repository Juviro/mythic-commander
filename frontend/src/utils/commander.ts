import { DeckCard } from 'types/graphql';
import { UnifiedCard } from 'types/unifiedTypes';

export const getColorIdentity = (cards: (DeckCard & UnifiedCard)[] | null) => {
  if (!cards) return [];

  const commander = cards.filter(({ isCommander }) => isCommander);
  return commander.reduce(
    (acc, { color_identity }) => [...new Set(acc.concat(color_identity))],
    []
  );
};
