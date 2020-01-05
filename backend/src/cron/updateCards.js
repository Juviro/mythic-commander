import { Cards } from 'scryfall-sdk';
import { ALL_CARD_FIELDS } from '../database/cardFields';
import knex from '../database';

const updateClause = ALL_CARD_FIELDS.map(({ key }) => `${key} = EXCLUDED.${key}`).join(', ');

const ON_DUPLICATE = ` ON CONFLICT (id) DO UPDATE SET ${updateClause}, "lastUpdate" = NOW()`;

const getCards = async page =>
  new Promise(resolve => {
    const cards = [];
    const emitter = Cards.all(page).cancelAfterPage();
    emitter
      .on('data', card => {
        cards.push(card);
      })
      .on('end', () => {
        resolve({ cards, hasNext: false });
      })
      .on('cancel', () => {
        resolve({ cards, hasNext: true });
      });
  });

const addCardsFromPage = async page => {
  const { cards, hasNext } = await getCards(page);

  const cardsToInsert = cards
    .filter(({ lang }) => lang === 'en')
    .map(card =>
      ALL_CARD_FIELDS.reduce((acc, { key, type }) => {
        const value = type === 'jsonb' ? JSON.stringify(card[key]) : card[key];
        acc[key] = value;
        return acc;
      }, {})
    );

  if (cardsToInsert.length) {
    await knex.raw(
      knex('cards')
        .insert(cardsToInsert)
        .toString()
        .replace(/\?/g, '\\?') + ON_DUPLICATE
    );
  }

  return hasNext;
};

const updateCards = async () => {
  const start = Date.now();
  console.info('Starting to update cards at', new Date().toLocaleString('de', { timeStyle: 'short' }));
  let hasNext = true;
  const eventOptions = { key: 'currentScryfallPage' };

  while (hasNext) {
    const [currentPage] = await knex('events')
      .where(eventOptions)
      .then(rows => rows.map(({ value }) => Number(value)));
    if (currentPage === undefined) {
      await knex('events').insert({ ...eventOptions, value: '0' });
    }

    hasNext = await addCardsFromPage(currentPage || 0);

    await knex('events')
      .where(eventOptions)
      .update({ value: hasNext ? String(currentPage + 1) : '0' });
  }
  console.info('Finished updating cards after', Math.round((Date.now() - start) / (1000 * 60)), 'minutes');
};

export default updateCards;
