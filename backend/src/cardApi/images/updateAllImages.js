import knex from '../../database';
import storeCardImage from './storeCardImage';

const BATCH_SIZE = 10;

const printProgress = (offset) => {
  if (typeof process.stdout.clearLine !== 'function') return;
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`${offset} card images updated`);
};

const updateAllImages = async () => {
  let offset = 0;

  while (true) {
    const cards = await knex('cards').limit(BATCH_SIZE).offset(offset);

    if (cards.length === 0) {
      break;
    }

    const promises = cards.map((card) => {
      return storeCardImage(card, true);
    });

    await Promise.all(promises);
    offset += BATCH_SIZE;
    printProgress(offset);
  }

  console.info('All card images updated');
};

export default updateAllImages;
