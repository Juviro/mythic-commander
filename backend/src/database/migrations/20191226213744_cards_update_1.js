import { CARD_FIELDS_ADDITION_1 } from '../cardFields';

export const up = async (knex) => {
  await knex.schema.alterTable('cards', (table) => {
    CARD_FIELDS_ADDITION_1.forEach(({ key, type, length }) => {
      table[type](key, length);
    });
  });
};

export const down = async (knex) => {
  await knex.schema.alterTable('cards', (table) => {
    CARD_FIELDS_ADDITION_1.forEach(({ key }) => {
      table.dropColumn(key);
    });
  });
};
