import { CARD_FIELDS_INITIAL } from '../cardFields';

export const up = async (knex) => {
  await knex.schema.createTable('cards', (table) => {
    CARD_FIELDS_INITIAL.forEach(({ key, type, specificType, length }) => {
      if (type) {
        table[type](key, length);
      } else if (specificType) {
        table.specificType(key, specificType);
      }
    });
    table.timestamp('lastUpdate').defaultTo(knex.fn.now());
    table.primary(['id']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('cards');
};
