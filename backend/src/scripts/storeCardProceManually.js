import storeCardPrice from "../cron/storeCardPrice";

const backup = async () => {
  await storeCardPrice();
  process.exit(0);
};

storeCardPrice();
