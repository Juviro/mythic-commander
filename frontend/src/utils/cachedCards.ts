import { CachedCard } from 'types/graphql';

export const formatCachedCards = (cards: CachedCard[]) =>
  cards.map(({ i, n, k, o }) => ({
    id: i,
    oracle_id: o,
    name: n,
    imgKey: k,
  }));
