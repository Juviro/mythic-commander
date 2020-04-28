import { getImageKey } from './helper';

const resolver = {
  oracleCard(card) {
    return card;
  },
  price({ prices: { usd, usd_foil } }) {
    return usd || usd_foil || 0;
  },
  imgKey(card) {
    return getImageKey(card);
  },
  mana_cost({ mana_cost, card_faces }) {
    if (mana_cost !== null || !card_faces) return mana_cost;
    return card_faces[0].mana_cost;
  },

  colors({ colors, card_faces }) {
    if (colors !== null || !card_faces) return colors;
    return card_faces[0].colors;
  },
};

export default resolver;
