import { ListCard } from 'types/unifiedTypes';
import { Card } from 'types/graphql';

export const unifySingleCard = ({ oracleCard, ...coreFields }: Card) => ({
  ...oracleCard,
  ...coreFields,
});

export default (cards: ListCard[]) => {
  if (!cards) return null;
  return cards.map(({ card: { oracleCard, ...coreFields }, ...rest }) => {
    return { ...rest, ...oracleCard, ...coreFields };
  });
};
