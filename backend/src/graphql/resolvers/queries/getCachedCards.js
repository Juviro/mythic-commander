import { getImageKey } from './Card/helper';

export const getCachedCards = async (db) => {
  const cards = await db('distinctCards');
  return cards.map(({ name, id, oracle_id, ...rest }) => ({
    k: getImageKey(rest),
    n: name,
    i: id,
    o: oracle_id,
  }));
};

export const getCachedCardsBySet = async (db, setKey) => {
  const cards = await db('distinctCardsPerSet').where({ set: setKey });
  return cards.map(({ name, id, oracle_id, ...rest }) => ({
    k: getImageKey(rest),
    n: name,
    i: id,
    o: oracle_id,
  }));
};
