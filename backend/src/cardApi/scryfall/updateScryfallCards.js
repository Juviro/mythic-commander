import fs from 'fs';
import readline from 'readline';

import knex from '../../database';
import { ALL_CARD_FIELDS } from '../../database/cardFields';
import {
  isSpecialCard,
  getMainVariant,
} from '../../graphql/resolvers/queries/Card/helper';
import storeCardImage from '../images/storeCardImage';
import downloadCardJson from './downloadCardJson';

const updateClause = ALL_CARD_FIELDS.map(
  ({ key }) => `${key} = EXCLUDED.${key}`
).join(', ');

const ON_DUPLICATE = ` ON CONFLICT (id) DO UPDATE SET ${updateClause}, "lastUpdate" = NOW()`;

const shouldSkipCard = ({ set, games }) => {
  // Jumpstart Front Cards
  if (set === 'fjmp') return true;
  // Cards that only exists digitally
  if (games.length && !games?.includes('paper')) return true;

  return false;
};

export const updateScryfallCards = async (type, tableName) => {
  const filePath = await downloadCardJson(type);

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  console.info('processing scryfall cards...');

  let numberOfCards = 0;
  let numberOfSkippedCards = 0;

  const printProgress = () => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `${numberOfCards} cards processed, ${numberOfSkippedCards} skipped`
    );
  };

  for await (const line of rl) {
    try {
      // remove trailing comma
      const parsableCard = line.replace(/,$/, '');
      const card = JSON.parse(parsableCard);
      numberOfCards++;

      if (shouldSkipCard(card)) {
        numberOfSkippedCards++;
        continue;
      }
      printProgress();
      // double faced cards don't always set all fields,
      // so we fallback to the value of the front face
      const setMissingProp = prop => {
        if (card[prop] === undefined) card[prop] = card.card_faces[0]?.[prop];
      };

      ['oracle_id', 'cmc', 'mana_cost', 'type_line'].forEach(setMissingProp);

      const cardToInsert = ALL_CARD_FIELDS.reduce((acc, field) => {
        const value =
          field.type === 'jsonb'
            ? JSON.stringify(card[field.key])
            : card[field.key];

        acc[field.key] = value;

        return acc;
      }, {});

      cardToInsert.is_special = isSpecialCard(card);
      cardToInsert.primary_variant = getMainVariant(card);

      await knex.raw(
        knex(tableName)
          .insert(cardToInsert)
          .toString()
          .replace(/\?/g, '\\?') + ON_DUPLICATE
      );

      await storeCardImage(card);
    } catch (e) {
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
