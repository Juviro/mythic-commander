import CardMarketRequest, { FileTool } from 'cardmarket-request';
import fs from 'fs';
import path from 'path';
import knex from '../../database';

import { formatCards } from './formatCards';
import credentials from '../../../credentials';

const workDir = `${__dirname}/tmp`;

const cmr = new CardMarketRequest({
  ...credentials.cardmarket,
  workDir,
});

const downloadPriceguide = async () => {
  const gzPath = await cmr.download('/priceguide');
  const csvPath = await FileTool.unzip(gzPath);
  return FileTool.createJSON(csvPath);
};

const deleteFiles = async () =>
  new Promise(resolve => {
    fs.readdir(workDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(workDir, file), err => {
          if (err) throw err;
          resolve();
        });
      }
    });
  });

const updateDb = async cards => {
  const query = `
    UPDATE cards AS c 
    SET cardmarket_prices = t.cardmarket_prices
    FROM (values
      ${cards
        .map(card => {
          const { idproduct: cardmarket_id, ...cardmarket_prices } = card;
          return `(${cardmarket_id}, '${JSON.stringify(
            cardmarket_prices
          )}'::jsonb)`;
        })
        .join(',\n')}
    ) AS t(cardmarket_id, cardmarket_prices)
    WHERE t.cardmarket_id = c.cardmarket_id
  `;

  return knex.raw(query);
};

export const updateCardmarketPrices = async () => {
  console.info('downloading cardmarket prices...');
  const { path } = await downloadPriceguide();
  await knex('cards').update({ cardmarket_prices: null });

  console.info('processing cardmarket prices...');

  // eslint-disable-next-line no-sync
  const file = fs.readFileSync(path);
  const cards = JSON.parse(file);
  const formattedCards = formatCards(cards);
  await updateDb(formattedCards);
  await deleteFiles();
  console.info('updated cardmarket prices');
};
