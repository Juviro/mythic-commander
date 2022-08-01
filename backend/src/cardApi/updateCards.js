import knex from '../database';
import { updateScryfallCards } from './scryfall/updateScryfallCards';

const deleteOldCards = async () => {
  try {
    const query = `DELETE from cards WHERE to_date("lastUpdate"::TEXT,'YYYY-MM-DD')  < NOW() - INTERVAL '7 days';`;
    return knex.raw(query);
  } catch (e) {
    console.error('Error deleting old cards:', e);
  }
};

const updateCards = async () => {
  const start = Date.now();
  console.info(
    'Starting to update cards at',
    new Date().toLocaleString('de', { timeStyle: 'short', dateStyle: 'short' })
  );

  try {
    await updateScryfallCards('default_cards', 'cards');
    await deleteOldCards();

    await knex.raw(`REFRESH MATERIALIZED VIEW "distinctCards"`);
    await knex.raw(`REFRESH MATERIALIZED VIEW "distinctCardsPerSet"`);
    await knex.raw(`REFRESH MATERIALIZED VIEW "distinctTokens"`);
  } catch (e) {
    console.error('Error updating cards:', e);
  }

  console.info(
    'Finished updating cards after',
    Math.round((Date.now() - start) / (1000 * 60)),
    'minutes'
  );
};

export default async () => {
  try {
    await updateCards();
  } catch (e) {
    console.error('error updating cards', e);
  }
};
