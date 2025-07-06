import updateScryfallTags from '../cardApi/scryfallTags/updateScryfallTags';

const storeScryfallTagsManually = async () => {
  await updateScryfallTags();
  process.exit(0);
};

storeScryfallTagsManually();
