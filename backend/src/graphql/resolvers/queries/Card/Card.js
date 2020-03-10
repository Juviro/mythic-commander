import { getAllSets } from './helper';

const resolver = {
  async owned({ oracle_id }, _, { db, user: { id: userId } }) {
    const [owned] = await db('collectionWithOracle').where({
      userId,
      oracle_id,
    });
    return Boolean(owned);
  },
  allSets({ oracle_id }, _, { db, user: { id: userId } }) {
    return getAllSets(oracle_id, userId, db);
  },
};

export default resolver;
