import { ListCard, UnifiedCardType, UnifiedSingleCard } from 'types/unifiedTypes';
import { Card } from 'types/graphql';

export const unifySingleCard = ({
  oracleCard,
  ...coreFields
}: Card): UnifiedSingleCard => {
  const unifiedCard = {
    ...oracleCard,
    ...coreFields,
    allSets: oracleCard?.allSets?.map(unifySingleCard),
  };

  if (!unifiedCard.allSets) {
    delete unifiedCard.allSets;
  }

  return unifiedCard;
};

export default <T extends ListCard>(cards: T[]): UnifiedCardType<T>[] => {
  if (!cards) return null;

  const unifiedCards = cards.map(({ card: { oracleCard, ...coreFields }, ...rest }) => {
    return { ...rest, ...oracleCard, ...coreFields };
  });

  return (unifiedCards as unknown) as UnifiedCardType<T>[];
};
