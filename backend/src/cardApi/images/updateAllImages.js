import knex from '../../database';
import storeCardImage from './storeCardImage';

const updateAllImages = async () => {
  const allCards = await knex('cards');

  const promises = allCards.map(async (card) => {
    return storeCardImage(card, true);
  });

  return Promise.all(promises);
};

export default updateAllImages;
