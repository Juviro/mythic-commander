import { Set } from '../../../types/graphql';
import useLocalStorage from '../../Hooks/useLocalStorage';

type GroupProperty = 'type' | 'year';

const SET_GROUPS = [
  {
    keys: ['core', 'expansion'],
    name: 'Standard Sets',
  },
  {
    keys: ['masters'],
    name: 'Masters Sets',
  },
  {
    keys: ['commander'],
    name: 'Commander Preconstructed Decks',
  },
  {
    keys: ['masterpiece'],
    name: 'Masterpieces',
  },
  {
    keys: ['draft_innovation'],
    name: 'Draft Innovation Sets',
  },
  {
    keys: ['promo'],
    name: 'Promo Sets',
  },
  {
    keys: ['box'],
    name: 'Box Sets',
  },
  {
    keys: ['spellbook', 'arsenal', 'from_the_vault', 'archenemy'],
    name: 'Arsenal, Spellbook, From the Vault, Archenemy',
  },
  {
    keys: ['premium_deck', 'duel_deck', 'starter'],
    name: 'Premium Decks, Duel Decks, Starter Decks',
  },
  {
    keys: ['funny'],
    name: 'Un-Sets, Miscellaneous',
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
  }));
};

const useGroupSets = (sets: Set[]) => {
  const [groupBy, setGroupBy] = useLocalStorage('group-by', 'type');

  const groupedSets = groupSets(sets, groupBy as GroupProperty);

  return {
    groupedSets,
    groupBy,
    setGroupBy,
  };
};

export default useGroupSets;
