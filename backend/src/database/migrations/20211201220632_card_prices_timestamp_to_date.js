export const up = async knex => {
  await knex.schema.alterTable('cardPrices', table => {
    table.renameColumn('timestamp', 'date');
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cardPrices', table => {
    table.renameColumn('date', 'timestamp');
  });
};
