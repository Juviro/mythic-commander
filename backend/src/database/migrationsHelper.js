export const addFieldsToCards = (newFields) => ({
  up: async (knex) => {
    await knex.schema.alterTable('cards', (table) => {
      newFields.forEach(({ key, type, length, specificType }) => {
        if (type) {
          table[type](key, length);
        } else if (specificType) {
          table.specificType(key, specificType);
        }
      });
    });
  },

  down: async (knex) => {
    await knex.schema.alterTable('cards', (table) => {
      newFields.forEach(({ key }) => {
        table.dropColumn(key);
      });
    });
  },
});
