export const up = async knex => {
  await knex.schema.alterTable('cardToDeck', table => {
    table
      .integer('amount')
      .defaultsTo(1)
      .notNullable();
  });
};

export const down = async knex => {
  await knex.schema.alterTable('cardToDeck', table => {
    table.dropColumn('amount');
  });
};
