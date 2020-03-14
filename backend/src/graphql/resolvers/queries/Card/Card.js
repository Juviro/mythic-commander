import { getAllSets, getPreviewImg, getTypes } from './helper';

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
  primaryTypes(card) {
    return getTypes(card).primaryTypes;
  },

  previewImg(card) {
    return getPreviewImg(card);
  },
  minPrice({ prices: { usd = 0, usd_foil = 0 } }) {
    return Math.min(usd, usd_foil);
  },
};

export default resolver;
