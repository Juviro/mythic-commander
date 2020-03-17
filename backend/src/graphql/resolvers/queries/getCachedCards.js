import { getImageKey } from './Card/helper';

export default async db => {
  const cards = await db('distinctCards');
  return cards.map(({ name, id, oracle_id, ...rest }) => ({
    k: getImageKey(rest),
    n: name,
    i: id,
    o: oracle_id,
  }));
};
