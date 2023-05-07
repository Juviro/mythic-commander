import { Set } from '../../../types/graphql';

export type GroupProperty = 'type' | 'year';

export const SET_GROUPS = [
  {
    keys: ['core', 'expansion'],
    key: 'standard',
    name: 'Standard Sets',
  },
  {
    keys: ['masters'],
    key: 'masters',
    name: 'Masters Sets',
  },
  {
    keys: ['commander'],
    key: 'commander',
    name: 'Commander Preconstructed Decks',
  },
  {
    keys: ['masterpiece'],
    key: 'masterpiece',
    name: 'Masterpieces',
  },
  {
    keys: ['draft_innovation'],
    key: 'draft_innovation',
    name: 'Draft Innovation Sets',
  },
  {
    keys: ['promo'],
    key: 'promo',
    name: 'Promo Sets',
  },
  {
    keys: ['box'],
    key: 'box',
    name: 'Box Sets',
  },
  {
    keys: ['spellbook', 'arsenal', 'from_the_vault', 'archenemy'],
    key: 'special',
    name: 'Arsenal, Spellbook, From the Vault, Archenemy',
  },
  {
    keys: ['premium_deck', 'duel_deck', 'starter'],
    key: 'premium',
    name: 'Premium Decks, Duel Decks, Starter Decks',
  },
  {
    keys: ['funny'],
    key: 'funny',
    name: 'Funny',
  },
];

const groupSets = (sets: Set[], property: GroupProperty) => {
  if (property === 'year') {
    const setGroupsMap = sets.reduce((acc, set) => {
      const year = set.released_at.split('-')[0];

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(set);

      return acc;
    }, {} as { [key: string]: Set[] });

    return Object.entries(setGroupsMap)
      .map(([key, value]) => ({
        key,
        sets: value,
      }))
      .sort((a, b) => Number(b.key) - Number(a.key));
  }

  return SET_GROUPS.map(({ keys, name }) => ({
    key: name,
    sets: sets.filter((set) => keys.includes(set.set_type)),
  })).filter(({ sets: groupedSets }) => groupedSets.length > 0);
};

interface Props {
  sets: Set[];
  groupBy: GroupProperty;
  displayedSetTypes: string[];
}

const useGroupSets = ({ sets, groupBy, displayedSetTypes }: Props) => {
  const filteredSets = sets.filter((set) => {
    const categoryKey = SET_GROUPS.find(({ keys }) => keys.includes(set.set_type))?.key;
    return displayedSetTypes.includes(categoryKey);
  });

  const groupedSets = groupSets(filteredSets, groupBy as GroupProperty);

  return groupedSets;
};

export default useGroupSets;
