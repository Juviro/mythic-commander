import logger from '../logging/logger';
import getMoxfieldCardCollections from '../cardApi/moxfield/getMoxfieldCardCollections';
import getMoxfieldDeck from '../cardApi/moxfield/getMoxfieldDeck';
import db from '../database';

const updateSecretLairs = async (forceUpdate = false) => {
  logger.info('updating secret lairs');
  try {
    const secretLairs = await getMoxfieldCardCollections('secretLair');

    const existingSecretLairIds = await db('secretLair').pluck('id');

    let newSecretLairs = 0;

    while (secretLairs.length > 0) {
      const secretLair = secretLairs.shift();

      if (!forceUpdate && existingSecretLairIds.includes(secretLair.publicId)) {
        continue;
      }
      const deck = await getMoxfieldDeck(secretLair.publicId, {
        useOriginalName: true,
      });

      if (!deck) {
        continue;
      }

      await db('secretLair')
        .insert({
          id: secretLair.publicId,
          name: deck.name.replace('Secret Lair: ', ''),
          createdAt: deck.createdAt,
        })
        .onConflict('id')
        .merge();

      await db('cards')
        .update({
          secret_lair_id: secretLair.publicId,
        })
        .whereIn(
          'id',
          deck.cards.map((card) => card.id)
        );

      newSecretLairs += 1;
    }

    logger.info(`added ${newSecretLairs} new secret lairs`);
  } catch (error) {
    logger.error('error fetching secret lairs: ', error);
  }
  process.exit(0);
};

export default updateSecretLairs;
