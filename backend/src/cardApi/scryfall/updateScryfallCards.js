import fs from 'fs';
import readline from 'readline';

import knex from '../../database';
import { ALL_CARD_FIELDS } from '../../database/cardFields';
import downloadCardJson from './downloadCardJson';

const updateClause = ALL_CARD_FIELDS.map(
  ({ key }) => `${key} = EXCLUDED.${key}`
).join(', ');

const ON_DUPLICATE = ` ON CONFLICT (id) DO UPDATE SET ${updateClause}, "lastUpdate" = NOW()`;

export const updateScryfallCards = async (type, tableName) => {
  console.info('Downloading file...');
  const filePath = await downloadCardJson(type);
  console.info('Downloaded file to', filePath);

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  console.info('processing scryfall cards...');

  for await (const line of rl) {
    try {
      // remove trailing comma
      const parsableCard = line.replace(/,$/, '');
      const card = JSON.parse(parsableCard);

      const cardToInsert = ALL_CARD_FIELDS.reduce((acc, field) => {
        const value =
          field.type === 'jsonb'
            ? JSON.stringify(card[field.key])
            : card[field.key];
        acc[field.key] = value;
        return acc;
      }, {});

      await knex.raw(
        knex(tableName)
          .insert(cardToInsert)
          .toString()
          .replace(/\?/g, '\\?') + ON_DUPLICATE
      );
    } catch {
      // [ and ] are caught here, which are the first and last line of the json
    }
  }
  console.info('updated scryfall cards, deleting file');
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
