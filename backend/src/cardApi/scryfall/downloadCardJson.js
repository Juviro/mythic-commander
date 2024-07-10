import fs from 'fs';
import { Stream } from 'stream';
import logger from '../../logging/logger';
// TODO: stream instead of download, maybe use scryfall-sdk

// @Param type:
//   * default_cards: all cards in english or original language
//   * oracle_cards: distinct cards, most recent version of each one
export default async (type) => {
  logger.info();
  const { data } = await fetch('https://api.scryfall.com/bulk-data').then(
    (res) => res.json()
  );
  const { download_uri } = data.find(({ type: _type }) => type === _type);
  logger.info('starting to download file from', download_uri);

  const filePath = `${__dirname}/${type}.json`;

  const res = await fetch(download_uri);

  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);
    Stream.Readable.fromWeb(res.body).pipe(fileStream);
    fileStream.on('error', (err) => {
      reject(err);
    });
    fileStream.on('finish', () => {
      resolve();
    });
  });

  logger.info('saved cards to', filePath);

  return filePath;
};
