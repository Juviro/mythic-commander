import fs from 'fs';
import fetch from 'node-fetch';

// TODO: stream instead of download, maybe use scryfall-sdk

// @Param type:
//   * default_cards: all cards in english or original language
//   * oracle_cards: distinct cards, most recent version of each one
export default async type => {
  console.info();
  const { data } = await fetch('https://api.scryfall.com/bulk-data').then(res =>
    res.json()
  );
  const { download_uri } = data.find(({ type: _type }) => type === _type);
  console.info('Starting to download file from', download_uri);

  const filePath = `${__dirname}/tmp/${type}.json`;

  const res = await fetch(download_uri);

  console.info('Downloaded file', filePath);

  await new Promise((resolve, reject) => {
    console.info('DEBUG: 1');
    const fileStream = fs.createWriteStream(filePath);
    console.info('DEBUG: 2');
    try {
      res.body.pipe(fileStream);
      res.body.on('error', err => {
        console.error('Error downloading cards:', err);
        reject(err);
      });
      fileStream.on('finish', () => {
        console.info('DEBUG: 3');
        resolve();
      });
    } catch (e) {
      console.error('Error downloading cards:', e);
    }
  });

  console.info('saved cards to', filePath);

  return filePath;
};
