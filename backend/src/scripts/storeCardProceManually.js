import storeCardPrice from '../cron/storeCardPrice';

const storeCardPriceManually = async () => {
  await storeCardPrice();
  process.exit(0);
};

storeCardPriceManually();
