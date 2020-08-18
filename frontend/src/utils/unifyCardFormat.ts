import { UnifiedCard2, ListCard } from 'types/unifiedTypes';
import { DeckCard } from 'types/graphql';

export const unifySingleCard = ({ oracleCard, ...coreFields }) => ({
  ...oracleCard,
  ...coreFields,
});

export default (cards: DeckCard[]): UnifiedCard2[] => {
  if (!cards) return null;
  return cards.map(({ card: { oracleCard, ...coreFields }, ...rest }) => {
    return { ...oracleCard, ...coreFields, ...rest };
  });
};
