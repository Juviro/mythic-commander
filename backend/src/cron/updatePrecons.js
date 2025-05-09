import logger from '../logging/logger';
import getMoxfieldCardCollections from '../cardApi/moxfield/getMoxfieldCardCollections';
import getMoxfieldDeck from '../cardApi/moxfield/getMoxfieldDeck';
import db from '../database';

const stringifyArrays = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = Array.isArray(obj[key]) ? JSON.stringify(obj[key]) : obj[key];
    return acc;
  }, {});
};

const updatePrecons = async (forceUpdate = false) => {
  logger.info('updating precons');
  try {
    const precons = await getMoxfieldCardCollections('commanderPrecons');

    const existingPreconIds = await db('precons').pluck('id');

    let newPrecons = 0;

    while (precons.length > 0) {
      const precon = precons.shift();
      if (!forceUpdate && existingPreconIds.includes(precon.publicId)) {
        continue;
      }
      const deck = await getMoxfieldDeck(precon.publicId);

      if (!deck) {
        continue;
      }

      await db('precons')
        .insert(stringifyArrays(deck))
        .onConflict('id')
        .ignore();
      newPrecons += 1;
    }

    logger.info(`added ${newPrecons} new precons`);
  } catch (error) {
    logger.error('error fetching precons: ', error);
  }
  process.exit(0);
};

export default updatePrecons;
