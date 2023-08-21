import fetch from 'node-fetch';
import { pick } from 'lodash';

import db from '../../database';

const SET_URL = 'https://api.scryfall.com/sets';

const SET_FIELDS = [
  'id',
  'code',
  'name',
  'released_at',
  'set_type',
  'card_count',
  'parent_set_code',
  'nonfoil_only',
  'foil_only',
  'icon_svg_uri',
];

const SKIPPED_SET_TYPES = [
  'memorabilia',
  'minigame',
  'planechase',
  'token',
  'vanguard',
];

const updateSets = async () => {
  try {
    const uniqueCardsPerSet = await db('distinctCardsPerSet')
      .whereNot('name', 'ilike', 'Basic Land —%')
      .select('set', db.raw('count(*) as count'))
      .groupBy('set');

    const cardsPerSetMap = uniqueCardsPerSet.reduce((acc, { set, count }) => {
      acc[set] = count;
      return acc;
    }, {});

    const response = await fetch(SET_URL);
    const { data } = await response.json();

    const sets = data
      .filter(({ digital, set_type, card_count }) => {
        return (
          !digital && !SKIPPED_SET_TYPES.includes(set_type) && card_count > 0
        );
      })
      .map((set) => ({
        ...pick(set, SET_FIELDS),
        uniqueCardCount: cardsPerSetMap[set.code] ?? 0,
      }));

    await db('sets').insert(sets).onConflict('id').merge();
  } catch (e) {
    console.error('Error updating sets:', e);
  }
};

export default updateSets;
