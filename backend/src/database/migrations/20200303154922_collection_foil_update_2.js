export const up = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('foilAmount');
    table.integer('amountFoil').defaultsTo(0);
  });
};

export const down = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('amountFoil');
    table.integer('foilAmount').defaultsTo(0);
  });
};
