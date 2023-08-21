export const up = async (knex) => {
  await knex.schema.createTable('cardPricesNew', (table) => {
    table
      .string('id')
      .primary()
      .notNullable()
      .references('cards.id')
      .onDelete('CASCADE');

    table.specificType('entries', 'jsonb');
  });

  await knex.raw(`
    INSERT INTO "cardPricesNew"
    (
        SELECT 
            id, 
            jsonb_agg(
                json_build_object(
                    'date', date,
                    'priceEur', "priceEur",
                    'priceEurFoil', "priceEurFoil", 
                    'priceUsd', "priceUsd", 
                    'priceUsdFoil', "priceUsdFoil"
    
                )
                ORDER BY date ASC
            )
        FROM 
            "cardPrices"
        GROUP BY 
            id
    );
  `);

  await knex.schema.dropTable('cardPrices');
  await knex.schema.renameTable('cardPricesNew', 'cardPrices');
};

// eslint-disable-next-line no-empty-function
export const down = async () => {};
