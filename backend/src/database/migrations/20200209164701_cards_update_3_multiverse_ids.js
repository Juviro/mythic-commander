import { CARD_FIELDS_ADDITION_3 } from '../cardFields';

export const up = async knex => {
  await knex.schema.alterTable('cards', table => {
    CARD_FIELDS_ADDITION_3.forEach(({ key, type, length, specificType }) => {
      if (type) {
        table[type](key, length);
      } else if (specificType) {
        table.specificType(key, specificType);
      }
    });
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cards', table => {
    CARD_FIELDS_ADDITION_3.forEach(({ key }) => {
      table.dropColumn(key);
    });
  });
};
