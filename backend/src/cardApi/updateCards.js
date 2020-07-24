import fs from 'fs';
import readline from 'readline';

import knex from '../database';
import { ALL_CARD_FIELDS } from '../database/cardFields';
import downloadCardJson from './downloadCardJson';

const updateClause = ALL_CARD_FIELDS.map(
  ({ key }) => `${key} = EXCLUDED.${key}`
).join(', ');

const ON_DUPLICATE = ` ON CONFLICT (id) DO UPDATE SET ${updateClause}, "lastUpdate" = NOW()`;

const updateCards = async (type, tableName) => {
  const filePath = await downloadCardJson(type);

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  console.info('processing cards...');

  for await (const line of rl) {
    try {
      // remove trailing comma
      const parsableCard = line.replace(/,$/, '');
      const card = JSON.parse(parsableCard);

      const cardToInsert = ALL_CARD_FIELDS.reduce((acc, { key, type }) => {
        const value = type === 'jsonb' ? JSON.stringify(card[key]) : card[key];
        acc[key] = value;
        return acc;
      }, {});

      await knex.raw(
        knex(tableName)
          .insert(cardToInsert)
          .toString()
          .replace(/\?/g, '\\?') + ON_DUPLICATE
      );
    } catch {
      // [ and ] are caught here
    }
  }
  console.info('updated cards, deleting file');
  return new Promise((resolve, reject) =>
    fs.unlink(filePath, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
};

export default async () => {
  const start = Date.now();
  console.info(
    'Starting to update cards at',
    new Date().toLocaleString('de', { timeStyle: 'short', dateStyle: 'short' })
  );

  await updateCards('default_cards', 'cards');

  await knex.raw(`REFRESH MATERIALIZED VIEW "distinctCards"`);
  await knex.raw(`REFRESH MATERIALIZED VIEW "distinctCardsPerSet"`);

  console.info(
    'Finished updating cards after',
    Math.round((Date.now() - start) / (1000 * 60)),
    'minutes'
  );
};
