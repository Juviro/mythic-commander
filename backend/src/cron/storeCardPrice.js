import db from '../database';

const storeCardPrice = async () => {
  await db.raw(`
        INSERT INTO "cardPrices" (
            SELECT 
                id,
                (prices->>'usd')::float as "priceUsd",
                (prices->>'usd_foil')::float as "priceUsdFoil",
                (prices->>'eur')::float as "priceEur",
                (prices->>'eur_foil')::float as "priceEurFoil"
            FROM cards
        )
    `);
};

export default storeCardPrice;
