import { CARD_FIELDS_ADDITION_2 } from '../cardFields';

export const up = async knex => {
  await knex.schema.alterTable('cards', table => {
    CARD_FIELDS_ADDITION_2.forEach(({ key, type, length }) => {
      table[type](key, length);
    });
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cards', table => {
    CARD_FIELDS_ADDITION_2.forEach(({ key }) => {
      table.dropColumn(key);
    });
  });
};
