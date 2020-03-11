import { Cards, Sets } from 'scryfall-sdk';

// TODO: deprecate this file? I think most is unused
const MAX_CARDS = 60;

export const getCards = async search => {
  return new Promise(resolve => {
    const cards = [];

    const emitter = search ? Cards.search(search) : Cards.all();
    emitter
      .on('data', card => {
        cards.push(card);
        if (cards.length >= MAX_CARDS) {
          resolve(cards);
          emitter.cancel();
        }
      })
      .on('end', () => {
        resolve(cards);
      });
  });
};

export const getAllSets = async () => {
  const sets = await Sets.all();

  return sets.reduce((acc, { code, name, icon_svg_uri }) => {
    return {
      ...acc,
      [code]: {
        name,
        icon_svg_uri,
      },
    };
  }, {});
};
