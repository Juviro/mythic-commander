export const formatCachedCards = cards =>
  cards.map(({ i, n, k, o }) => ({
    id: i,
    oracle_id: o,
    name: n,
    imgKey: k,
  }));
