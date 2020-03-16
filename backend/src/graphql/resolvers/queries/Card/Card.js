import { getAllSets, getPreviewImg, getTypes, getImageKey } from './helper';

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
  subTypes(card) {
    return getTypes(card).subTypes || [];
  },
  previewImg(card) {
    return getPreviewImg(card);
  },
  minPrice({ prices: { usd, usd_foil } }) {
    return usd || usd_foil || 0;
  },
  imgKey(card) {
    return getImageKey(card);
  },
  isTwoFaced({ card_faces }) {
    return Boolean(card_faces);
  },
  isCommanderLegal({ legalities }) {
    return legalities.commander === 'legal';
  },
  totalAmount({ amount, amountFoil }) {
    return Number(amount) + Number(amountFoil);
  },
};

export default resolver;
