export const up = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('isFoil');
    table.integer('foilAmount').defaultsTo(0);
  });
};

export const down = async knex => {
  await knex.schema.alterTable('collection', table => {
    table.dropColumn('foilAmount');
    table.boolean('isFoil');
  });
};
