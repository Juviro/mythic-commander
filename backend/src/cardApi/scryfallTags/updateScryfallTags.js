import logger from '../../logging/logger';
import getAllScryfallTags from './getAllScryfallTags';
import getCardsByTag from './getCardsByTag';
import {
  getScryfallTags,
  storeScryfallTag,
  updateTags,
} from './scryfallTagsDb';

const getScryfallTagsWithChangedCount = async (scryfallTags) => {
  const currentScryfallTags = await getScryfallTags();

  const countMap = currentScryfallTags.reduce((acc, tag) => {
    acc[tag.id] = tag.taggingCount;
    return acc;
  }, {});

  const tagsWithChangedCount = scryfallTags.filter((tag) => {
    return tag.taggingCount && countMap[tag.id] !== tag.taggingCount;
  });

  return tagsWithChangedCount;
};

const updateScryfallTags = async () => {
  logger.info('Updating scryfall tags');
  const scryfallTags = await getAllScryfallTags();
  logger.info(`Fetched ${scryfallTags.length} scryfall tags`);

  const tagsWithChangedCount = await getScryfallTagsWithChangedCount(
    scryfallTags
  );

  if (!tagsWithChangedCount.length) {
    logger.info('No tags with changed count');
    return;
  }

  for (const tag of tagsWithChangedCount) {
    logger.info(`Storing tag "${tag.name}" with ${tag.taggingCount} cards`);
    const cards = await getCardsByTag(tag);
    await storeScryfallTag(tag);
    await updateTags(cards);
    logger.info(`Stored tag "${tag.name}" with ${cards.length} cards`);
  }

  logger.info(
    `Finished updating scryfall tags, ${tagsWithChangedCount.length} tags updated`
  );
};

export default async () => {
  try {
    await updateScryfallTags();
  } catch (e) {
    logger.error('error updating scryfall tags', e);
  }
};
