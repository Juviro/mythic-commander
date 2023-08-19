import {
  createDistinctCards,
  createDistinctCardsPerSet,
  dropDistinctCards,
  dropDistinctCardsPerSet,
} from './materializedViews';

export const addFieldsToCards = (
  newFields,
  distinctCardsQuery,
  distinctCardsPerSetQuery
) => ({
  up: async (knex) => {
    if (distinctCardsQuery) {
      await dropDistinctCards(knex);
    }
    if (distinctCardsPerSetQuery) {
      await dropDistinctCardsPerSet(knex);
    }
    await knex.schema.alterTable('cards', (table) => {
      newFields.forEach(({ key, type, length, specificType }) => {
        if (type) {
          table[type](key, length);
        } else if (specificType) {
          table.specificType(key, specificType);
        }
      });
    });
    if (distinctCardsQuery) {
      await createDistinctCards(knex, distinctCardsQuery);
    }
    if (distinctCardsPerSetQuery) {
      await createDistinctCardsPerSet(knex, distinctCardsPerSetQuery);
    }
  },

  down: async (knex) => {
    if (distinctCardsQuery) {
      await dropDistinctCards(knex);
    }
    if (distinctCardsPerSetQuery) {
      await dropDistinctCardsPerSet(knex);
    }

    await knex.schema.alterTable('cards', (table) => {
      newFields.forEach(({ key }) => {
        table.dropColumn(key);
      });
    });

    if (distinctCardsQuery) {
      await createDistinctCards(knex, distinctCardsQuery);
    }
    if (distinctCardsPerSetQuery) {
      await createDistinctCardsPerSet(knex, distinctCardsPerSetQuery);
    }
  },
});
