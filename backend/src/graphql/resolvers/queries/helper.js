import { getImageKey } from './Card/helper';

export const getCachedCards = async db => {
  const { rows: cards } = await db.raw(`
    SELECT *  FROM "distinctCards" 
    WHERE layout <> ALL ( ARRAY[
      'token', 
      'double_faced_token', 
      'emblem',
      'planar',
      'vanguard',
      'scheme'
    ]);
    `);
  return cards.map(({ name, id, oracle_id, ...rest }) => ({
    k: getImageKey(rest),
    n: name,
    i: id,
    o: oracle_id,
  }));
};
