import { getImageKey } from './helper';

const getCard = db => async ({ id }) => {
  const card = await db('cards')
    .where({ id })
    .first();

  return card;
};

const resolver = {
  oracleCard(card) {
    return card;
  },
  oracle_text({ oracle_text, card_faces }) {
    if (oracle_text) return oracle_text;
    if (!card_faces) return null;

    return card_faces
      .map(cardFace => cardFace.oracle_text)
      .join('\n<cardface>\n');
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

  relatedCards({ all_parts, layout }, _, { db }) {
    if (!all_parts) return null;
    if (layout === 'token') return null;

    return Promise.all(all_parts.map(getCard(db)));
  },

  colors({ colors, card_faces }) {
    if (colors !== null || !card_faces) return colors;
    return card_faces[0].colors;
  },
};

export default resolver;
