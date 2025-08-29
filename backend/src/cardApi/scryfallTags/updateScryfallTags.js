import logger from '../../logging/logger';
import getAllScryfallTags from './getAllScryfallTags';
import getCardsByTag from './getCardsByTag';
import {
  getScryfallTags,
  storeScryfallTag,
  updateTags,
} from './scryfallTagsDb';

const getCurrentScryfallCounts = async () => {
  const currentScryfallTags = await getScryfallTags();

  const countMap = currentScryfallTags.reduce((acc, tag) => {
    acc[tag.id] = tag.taggingCount;
    return acc;
  }, {});

  return countMap;
};

const updateScryfallTags = async () => {
  logger.info('Updating scryfall tags');
  const tags = await getAllScryfallTags();

  logger.info(`Fetched ${tags.length} tags`);

  const currentScryfallCounts = await getCurrentScryfallCounts();

  let tagsWithUpdatedCount = 0;

  // TODO: instead of loggin each tag separately, count the number of updated and skipped tags + cards. Log that in the catch as well, also display the last step there

  for (const tag of tags) {
    logger.info(`Storing tag "${tag.name}"`);
    const { cards, taggingCount } = await getCardsByTag(
      tag,
      currentScryfallCounts[tag.id]
    );

    if (cards.length) {
      logger.info(`Updating tags for "${tag.name}" with ${cards.length} cards`);
      await storeScryfallTag({ ...tag, taggingCount });
      await updateTags(cards);
      tagsWithUpdatedCount += 1;
      logger.info(`Stored tag "${tag.name}" with ${taggingCount} cards`);
    } else {
      logger.info(`Skipping tag "${tag.name}"`);
    }
  }

  logger.info(
    `Finished updating scryfall tags, ${tagsWithUpdatedCount} tags updated`
  );
};

export default async () => {
  try {
    await updateScryfallTags();
  } catch (e) {
    logger.error('error updating scryfall tags', e);
  }
};
