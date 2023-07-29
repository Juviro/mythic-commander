import fs from 'fs';
import readline from 'readline';

import knex from '../database';
import downloadCardJson from './scryfall/downloadCardJson';

const nonPlayableCardLayouts = [
  'token',
  'double_faced_token',
  'emblem',
  'planar',
  'vanguard',
  'scheme',
  'art_series',
];

export const setIsSpecialForDistinctCards = async () => {
  const filePath = await downloadCardJson('oracle_cards');

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const cardIds = [];

  for await (const line of rl) {
    try {
      // remove trailing comma
      const parsableCard = line.replace(/,$/, '');
      const card = JSON.parse(parsableCard);

      if (nonPlayableCardLayouts.includes(card.layout)) {
        continue;
      }

      cardIds.push(card.id);
    } catch (e) {
      // [ and ] are caught here, which are the first and last line of the json
    }
  }

  await knex('cards')
    .update({ is_special: -1 })
    .whereIn('id', cardIds)
    .andWhere('is_special', 0);
};
