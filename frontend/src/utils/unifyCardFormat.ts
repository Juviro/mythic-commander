import { UnifiedCard, ListCard } from 'types/unifiedTypes';

export const unifySingleCard = ({ oracleCard, ...coreFields }) => ({
  ...oracleCard,
  ...coreFields,
});

export default (cards: ListCard[]) => {
  if (!cards) return null;
  return cards.map(({ createdAt, card: { oracleCard, ...coreFields }, ...rest }) => {
    return { ...oracleCard, ...coreFields, ...rest };
  });
};
