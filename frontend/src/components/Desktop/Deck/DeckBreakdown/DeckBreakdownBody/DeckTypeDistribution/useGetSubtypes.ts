import CardContext from 'components/Provider/CardProvider/CardProvider';
import {
  CardType,
  CARD_TYPE_DECK_ORDER,
} from 'components/Provider/CardProvider/staticTypes';
import { useContext } from 'react';
import { UnifiedDeck } from 'types/unifiedTypes';

type SubtypesBySupertype = Record<
  CardType,
  {
    amount: number;
    subTypes: Record<string, number>;
  }
>;

const useGetSubtypes = (
  deck: UnifiedDeck,
  cardsbyTypeWithAmount: { name: CardType; amount: number }[]
) => {
  const { subTypesMap } = useContext(CardContext);

  const getMatchingSuperType = (subType: string, primaryTypes: string[]): CardType => {
    // TODO: the name "Tribal" will be renamed in the future, see https://mtg.fandom.com/wiki/Tribal#Renaming
    const isTribalSpell = primaryTypes.includes('Tribal');
    // these types are merged as "Spell" in the subTypesMap, but we want to split them up
    const isInstantOrSorcery = primaryTypes.some((type) =>
      ['Instant', 'Sorcery'].includes(type)
    );
    if (isTribalSpell || isInstantOrSorcery) {
      return primaryTypes.at(-1) as CardType;
    }

    return subTypesMap[subType];
  };

  const primaryTypesMap = CARD_TYPE_DECK_ORDER.reduce(
    (acc, type) => ({
      ...acc,
      [type]: {
        amount: cardsbyTypeWithAmount.find((card) => card.name === type)?.amount || 0,
        subTypes: {},
      },
    }),
    {}
  );

  const subtypesBySupertype = deck?.cards?.reduce((acc, card) => {
    if (!card.subTypes.length) return acc;

    card.subTypes.forEach((subType) => {
      const matchingSupertype = getMatchingSuperType(subType, card.primaryTypes);
      if (!matchingSupertype) return;

      if (!acc[matchingSupertype].subTypes[subType]) {
        acc[matchingSupertype].subTypes[subType] = card.amount;
      } else {
        acc[matchingSupertype].subTypes[subType] += card.amount;
      }
    });

    return acc;
  }, primaryTypesMap) as SubtypesBySupertype;

  const sortedRecords = Object.entries(subtypesBySupertype)
    .sort((a, b) => {
      const aIndex = CARD_TYPE_DECK_ORDER.indexOf(a[0] as CardType);
      const bIndex = CARD_TYPE_DECK_ORDER.indexOf(b[0] as CardType);

      return aIndex - bIndex;
    })
    .filter(([, value]) => value.amount > 0);

  return {
    sortedRecords,
  };
};

export default useGetSubtypes;
