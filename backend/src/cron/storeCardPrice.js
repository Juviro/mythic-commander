import db from '../database';

const storeCardPrice = async () => {
  await db.raw(`
        INSERT INTO "cardPrices" (
            SELECT 
                id,
                (prices->>'eur')::float,
                (prices->>'eur_foil')::float"
                (prices->>'usd')::float,
                (prices->>'usd_foil')::float,
            FROM cards
        )
    `);
};

export default storeCardPrice;
