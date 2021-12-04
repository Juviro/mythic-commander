export const up = async knex => {
  await knex.schema.createTable('cardPrices', table => {
    table
      .string('id')
      .notNullable()
      .references('cards.id')
      .onDelete('CASCADE');

    table.float('priceEur');
    table.float('priceEurFoil');
    table.float('priceUsd');
    table.float('priceUsdFoil');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
};

export const down = async knex => {
  await knex.schema.dropTable('cardPrices');
};
