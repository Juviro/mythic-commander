import db from '../database';

const storeCardPrice = async () => {
  console.info('Storing card price');
  await db.raw(`
        INSERT INTO "cardPrices" (
            SELECT 
                id,
                (prices->>'eur')::float,
                (prices->>'eur_foil')::float,
                (prices->>'usd')::float,
                (prices->>'usd_foil')::float
            FROM cards
            WHERE 'paper' = ANY(games)
        )
    `);
  console.info('Stored card price');
};

export default storeCardPrice;
