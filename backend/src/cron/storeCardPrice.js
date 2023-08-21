import db from '../database';

const storeCardPrice = async () => {
  console.info('Storing card price');

  // create entries for new cards
  await db.raw(`
    INSERT INTO "cardPrices" (
        SELECT 
          id, 
          '[]'::jsonb as entries 
        FROM cards
      ) 
    ON CONFLICT (id) DO NOTHING
  `);

  await db.raw(`
        UPDATE 
          "cardPrices" 
        SET
          entries = entries || prices
        FROM (
          SELECT 
            id,
            jsonb_build_object(
              'date', NOW(),
              'priceEur', (prices->>'eur')::float,
              'priceEurFoil', (prices->>'eur_foil')::float, 
              'priceUsd', (prices->>'usd')::float, 
              'priceUsdFoil', (prices->>'usd_foil')::float
          
          ) as prices
          FROM 
            cards
          WHERE 
            'paper' = ANY(games)
        ) new_values
        WHERE 
          new_values.id = "cardPrices".id
    `);
  console.info('Stored card price');
};

export default storeCardPrice;
