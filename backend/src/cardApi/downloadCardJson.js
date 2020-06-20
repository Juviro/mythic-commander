import fs from 'fs';
import fetch from 'node-fetch';

// @Param type: oneOf(oracle_cards)
export default async type => {
  console.info();
  const { data } = await fetch('https://api.scryfall.com/bulk-data').then(res =>
    res.json()
  );
  const { download_uri } = data.find(({ type: _type }) => type === _type);
  console.info('starting to download file from', download_uri);

  const filePath = `${__dirname}/${type}.json`;

  const res = await fetch(download_uri);

  await new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);
    res.body.pipe(fileStream);
    res.body.on('error', err => {
      reject(err);
    });
    fileStream.on('finish', () => {
      resolve();
    });
  });

  console.info('saved cards to', filePath);

  return filePath;
};
