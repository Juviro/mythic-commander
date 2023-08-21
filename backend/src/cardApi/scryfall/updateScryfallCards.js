import fs from 'fs';
import readline from 'readline';

import knex from '../../database';
import { ALL_CARD_FIELDS } from '../../database/cardFields';
import {
  isSpecialCard,
  padCollectorNumber,
} from '../../graphql/resolvers/queries/Card/helper';
import storeCardImage from '../images/storeCardImage';
import downloadCardJson from './downloadCardJson';
import { normalizeName } from '../../utils/normalizeName';
import { getCardVariants } from '../../graphql/resolvers/queries/Card/cardVariants';

const updateClause = ALL_CARD_FIELDS.map(
  ({ key }) => `${key} = EXCLUDED.${key}`
).join(', ');

const ON_DUPLICATE = ` ON CONFLICT (id) DO UPDATE SET ${updateClause}, "lastUpdate" = NOW()`;

const JUMPSTART_FRONT_CARD_SETS = ['fjmp', 'fj22', 'fone'];

const shouldSkipCard = ({ set, games, layout }) => {
  // Jumpstart Front Cards
  if (JUMPSTART_FRONT_CARD_SETS.includes(set)) return true;
  // Cards that only exists digitally
  if (games.length && !games?.includes('paper')) return true;
  // Art Series from Set boosters
  if (layout === 'art_series') return true;

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
    if (typeof process.stdout.clearLine !== 'function') return;
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(
      `${numberOfCards} cards processed, ${numberOfSkippedCards} skipped`
    );
  };

  // TODO: skip first and last line, actually print error in line 100
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
      const setMissingProp = (prop) => {
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
      cardToInsert.variants = getCardVariants(card);
      cardToInsert.primary_variant = cardToInsert.variants?.[0] ?? null;
      cardToInsert.collector_number = padCollectorNumber(card.collector_number);
      cardToInsert.normalized_name = normalizeName(card.name);

      await knex.raw(
        knex(tableName).insert(cardToInsert).toString().replace(/\?/g, '\\?') +
          ON_DUPLICATE
      );

      await storeCardImage(card);
    } catch (e) {
      // [ and ] are caught here, which are the first and last line of the json
    }
  }
  console.info('updated scryfall cards, deleting file');
  return new Promise((resolve, reject) =>
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
  );
};
